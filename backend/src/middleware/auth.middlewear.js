import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // add the package cookie-parser to the index.js to access the cookies
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No web token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    //  when we decode the jwt we get the user id from the token and then we can use it to find the user
    // when we find the user we remove the password so it won't get unneccarily exposed to the user

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protect route middlewear".error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
