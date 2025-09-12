const userModel = require("../../model/user model/userModel");

const checkApiActive = async (req, res, next) => {
  try {
    const apiUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`; //prtocol thi http ke https aave & host thi localhost 8000 aave & req.originalUrl anathi baki ni vadheli url aave

    const user = await userModel.findOne({ "apis.url": apiUrl });

    if (!user) return res.status(403).send("API not registered");

    const api = user.apis.find((a) => a.url === apiUrl);
    if (!api || !api.isActive) {
      return res.status(403).send("This API is disabled by admin");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = checkApiActive;
