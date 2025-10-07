const { OAuth2Client } = require("google-auth-library");
// const googleAuthModel = require("../../../../model/features/Auth/googleAuth/googleAuthModel");
const getGoogleAuthModel = require("../../../../model/features/Auth/googleAuth/googleAuthModel");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports.verifyGoogleToken = async (req, res) => {
  try {
    const ownerEmail = req.user.email;
    const googleAuthModel = getGoogleAuthModel(ownerEmail);

    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name } = payload;

    let user = await googleAuthModel.findOne({ email });

    if (!user) {
      user = await googleAuthModel.create({
        userName: name,
        email,
        password: "google-oauth",
        role: "user",
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY
    );

    res.cookie("token", jwtToken, { httpOnly: true });
    res.status(201).json({ token: jwtToken, user });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "Google token verification failed" });
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
