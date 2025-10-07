const userModel = require("../../model/user model/userModel");

const checkApiActive = async (req, res, next) => {
  try {
    const apiUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`; // builds full URL (protocol + host + originalUrl)
    
    // Extract UUID from the URL path (e.g., /api/NzniGAw/register -> NzniGAw)
    const uuid = req.params.uuid;
    
    if (!uuid) {
      return res.status(400).send("UUID parameter missing");
    }

    // Find user by checking if any API URL contains this UUID
    const user = await userModel.findOne({
      "apis.url": { $regex: `/${uuid}/`, $options: "i" }
    });

    if (!user) {
      return res.status(403).send("API not registered or UUID is invalid");
    }

    // Find the specific API that contains this UUID
    const api = user.apis.find((a) => a.url.includes(`/${uuid}/`));
    
    if (!api) {
      return res.status(403).send("API not found for this UUID");
    }
    
    if (!api.isActive) {
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
