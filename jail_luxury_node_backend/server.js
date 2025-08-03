import express from "express";
import cors from "cors";
import session from "express-session";
import { RateLimiterMemory } from "rate-limiter-flexible";
import connectSessionSequelize from "connect-session-sequelize";
import dotenv from "dotenv";
import sequelize from "./config/connection.js";
import router from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = connectSessionSequelize(session.Store);

// ==================== Rate Limiting Middleware ====================
const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 1,
});

app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch {
    res.status(429).send("Too Many Requests");
  }
});

// ==================== CORS and Cookie Middleware ====================
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.UI_ORIGIN]
    : ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user",router)
// ==================== Session Middleware ====================
const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

sessionStore.sync();

// ======================= Server Initialization =======================
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
});

// ======================= Process Error Handling =======================
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});
