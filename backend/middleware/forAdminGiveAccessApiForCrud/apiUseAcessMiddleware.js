const jwt = require("jsonwebtoken");
const userModel = require("../../model/user model/userModel");

const checkApiActive = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!apiKey || !token) {
      return res.status(401).json({ msg: "API key or token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded.apiKey !== apiKey || !decoded.userId || !decoded.feature) {
      return res.status(401).json({ msg: "Invalid token or API key" });
    }

    const apiUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const user = await userModel.findOne({
      _id: decoded.userId,
      "apis.url": apiUrl,
      "apis.apiKey": apiKey,
    });

    if (!user) return res.status(403).send("API not registered");

    const api = user.apis.find((a) => a.url === apiUrl);

    if (!api || api.isActive === false) {
      return res.status(403).send("This API is disabled by admin");
    }

    req.user = user; // pass user to controller if needed
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

module.exports = checkApiActive;
