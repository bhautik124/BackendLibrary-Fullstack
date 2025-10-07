// const roleBasedAuthModel = require("../../../../model/features/Auth/roleBasedAuth/roleBasedAuthModel");
const getRoleBasedAuthModel = require("../../../../model/features/Auth/roleBasedAuth/roleBasedAuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

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
  role: Joi.string().valid("user", "admin").required().messages({
    "any.only": "Role must be either 'user' or 'admin'",
    "string.empty": "Role is required",
  }),
});

module.exports.registerUser = async (req, res) => {
  try {
    // Joi validation
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const ownerEmail = req.user.email;
    const roleBasedAuthModel = getRoleBasedAuthModel(ownerEmail);

    let { userName, email, password, role } = req.body;

    let userExists = await roleBasedAuthModel.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createUser = await roleBasedAuthModel.create({
      userName,
      email,
      password: hash,
      role,
    });

    const token = jwt.sign(
      {
        email: createUser.email,
        id: createUser._id,
      },
      process.env.JWT_SECRET_KEY
    );

    res.cookie("token", token);
    res.status(201).send({ token, user: createUser });
  } catch (error) {
    res.status(404).send(error.message);
    console.log(error.message);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const ownerEmail = req.user.email;
    const roleBasedAuthModel = getRoleBasedAuthModel(ownerEmail);

    let { role, email, password } = req.body;
    const user = await roleBasedAuthModel.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid email or password");

    if (!role) return res.status(400).send("Role is required");
    if (role !== user.role) return res.status(400).send("Invalid role");

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET_KEY
    );

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(404).send(error.message);
    console.log(error.message);
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", "");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(404).send(error.message);
    console.log(error.message);
  }
};
