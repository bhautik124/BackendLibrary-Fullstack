// const emailOtpAuthModel = require("../../../../model/features/Auth/emailOtpAuth/emailOtpAuthModel");
const getEmailOtpAuthModel = require("../../../../model/features/Auth/emailOtpAuth/emailOtpAuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../../../../utils/sendEmialForOtpAuth");
const Joi = require("joi");
const getCookieOptions = require("../../../../utils/cookieOptions");

const schema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).trim().required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username cannot exceed 30 characters",
  }),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
    .lowercase()
    .trim()
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
    }),
});

module.exports.registerUser = async (req, res) => {
  try {
    // Joi validation
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const ownerEmail = req.user.email;
    const emailOtpAuthModel = getEmailOtpAuthModel(ownerEmail);

    const { userName, email, password } = req.body;

    const userExists = await emailOtpAuthModel.findOne({ email });
    if (userExists) return res.status(400).send("User already exists");

    const hash = await bcrypt.hash(password, 10);

    const user = await emailOtpAuthModel.create({
      userName,
      email,
      password: hash,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    res.cookie("token", token, getCookieOptions());
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.sendOtp = async (req, res) => {
  try {
    const ownerEmail = req.user.email;
    const emailOtpAuthModel = getEmailOtpAuthModel(ownerEmail);

    const { email } = req.body;
    const user = await emailOtpAuthModel.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = {
      code: otp,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000), // 2 min
    };
    await user.save();

    await sendMail(email, "Your OTP Code", `Your OTP is: ${otp}`);
    res.status(200).send("OTP sent to email");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.verifyUserPassword = async (req, res) => {
  try {
    const ownerEmail = req.user.email;
    const emailOtpAuthModel = getEmailOtpAuthModel(ownerEmail);

    const { email, password } = req.body;

    const user = await emailOtpAuthModel.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Incorrect password");

    res.status(200).send("Password verified");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const ownerEmail = req.user.email;
    const emailOtpAuthModel = getEmailOtpAuthModel(ownerEmail);

    const { email, password, otp } = req.body;

    const user = await emailOtpAuthModel.findOne({ email });
    if (!user) return res.status(400).send("Invalid email");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Wrong password");

    // Check OTP
    if (!otp) return res.status(400).send("OTP is required");
    if (!user.otp || user.otp.code !== otp || user.otp.expiresAt < new Date()) {
      return res.status(400).send("Invalid or expired OTP");
    }

    // Clear OTP after use
    user.otp = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    res.cookie("token", token, getCookieOptions());
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.logoutUser = async (req, res) => {
  res.cookie("token", "", { ...getCookieOptions(), maxAge: 0 });
  res.status(200).send("Logged out successfully");
};
