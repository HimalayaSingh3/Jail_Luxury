import express from "express";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import { RateLimiterMemory } from "rate-limiter-flexible";
import GoogleStrategy from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import routes from "./routes/index.js";
import { AppError, globalErrorHandler } from "./middlewares/errorHandler.js";
import User from "./models/User.js";
import connection from "./config/connection.js";
import dotenv from "dotenv";
dotenv.config();

const sequelize = connection;
const app = express();
const PORT = process.env.PORT || 3001;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

const rateLimiter = new RateLimiterMemory({ points: 10, duration: 1 });
app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch {
    res.status(429).send("Too Many Requests");
  }
});

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://your-frontend-domain.com"]
    : ["*"];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(morgan("dev"));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
console.log("DB_IP id ", process.env.DB_IP);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ where: { user_id: profile.id } });
        if (!user) {
          const newRefreshToken = crypto.randomBytes(64).toString("hex");
          user = await User.create({
            user_id: profile.id,
            first_name: profile?.name?.givenName,
            last_name: profile?.name?.familyName,
            email: profile.emails[0]?.value,
            refreshToken: newRefreshToken,
          });
        }

        done(null, user);
      } catch (error) {
        console.error("Google Strategy Error:", error);
        done(error, null);
      }
    }
  )
);

const generateAccessToken = (user) =>
  jwt.sign(
    { user_id: user.user_id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

const generateRefreshToken = async (user) => {
  const now = new Date();
  const rotationThreshold = 10 * 24 * 60 * 60 * 1000;
  if (
    user.is_logged_in &&
    user.updated_at &&
    now - user.updated_at < rotationThreshold
  ) {
    return user.refreshToken;
  }
  const newRefreshToken = crypto.randomBytes(64).toString("hex");
  await user.update({
    refreshToken: newRefreshToken,
    updated_at: now,
    is_logged_in: 1,
  });
  return newRefreshToken;
};

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent",
  })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    const accessToken = generateAccessToken(req.user);
    const refreshToken = await generateRefreshToken(req.user);

    // ✅ Set Cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: "Lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "Lax",
    });

    // Redirect to Next.js frontend
    res.redirect("http://localhost:3000/profile");
  }
);

app.use(routes);
app.use(globalErrorHandler);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App running on port ${PORT}!`));
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});
