const jwt = require("jsonwebtoken");
const userModel = require("../../model/user model/userModel");

const auth = async (req, res, next) => {
  //first check token..if token milega tohi vo aage try catch me jayega varna nahi jayega..
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // token mil gaya..abb token verify honga..means jo token mila hai same vaho token databse me rhe kisi user ke pass hai to user find hoga and if agar nahi hai to user not found aa jayega
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).send("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ msg: "Unauthorized" });
  }
};
module.exports = auth;
