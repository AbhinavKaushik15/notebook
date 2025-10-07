import "dotenv/config.js";
import jwt from "jsonwebtoken";

const fetchUser = (req, res, next) => {
  // get the user from the jwt token add id to req object
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).json({ error: "Please authenticate using a valid token." });
  }

  try {
    const { userId } = jwt.verify(token, "" + process.env.JWT_SECRET);
    req.userId = userId;
    console.log("fetchUser :", userId);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Please authenticate using a valid token." });
  }
};

export default fetchUser;
