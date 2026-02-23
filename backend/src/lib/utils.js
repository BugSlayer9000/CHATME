import jwt from "jsonwebtoken";

export const genarateToken = (userId, res) => {

    // genarating the token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // sending the token throght cookies
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 100, // 7d in milliseconds
    httpOnly: true, // prevent xss attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
