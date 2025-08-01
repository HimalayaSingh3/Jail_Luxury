import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  const token = authHeader.split(" ")[1];

  console.log("token "+token+" authHeader ",authHeader)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token data to the request object
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};


export const getUserFromToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
 console.log("authHeader",authHeader)

  const token = authHeader?.split(" ")[1];

  if (token!=null || token != undefined) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded token data to the request object
      return req.user
    } catch (error) {
      console.error("Token verification failed:", error);
     
    }
  }
 
  return null;

  
};