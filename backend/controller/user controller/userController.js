const userModel = require("../../model/user model/userModel");
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
});

module.exports.registerUser = async (req, res) => {
  try {
    // Joi validation
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let { userName, email, password } = req.body;

    let userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createUser = await userModel.create({
      userName,
      email,
      password: hash,
    });

    const token = jwt.sign(
      {
        email: createUser.email,
        id: createUser._id,
      },
      process.env.JWT_SECRET_KEY
    );

    // Cookie settings for production
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS required in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Cross-site cookies for production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

    res.cookie("token", token, cookieOptions);
    
    // Also send token in response for localStorage fallback
    res.status(201).send({ 
      success: true,
      message: "User registered successfully",
      token, 
      user: {
        id: createUser._id,
        userName: createUser.userName,
        email: createUser.email
      }
    });
  } catch (error) {
    res.status(404).send(error.message);
    console.log(error.message);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid email or password");

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET_KEY
    );

    // Cookie settings for production
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS required in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Cross-site cookies for production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

    res.cookie("token", token, cookieOptions);
    
    // Also send token in response for localStorage fallback
    res.status(200).json({ 
      success: true,
      message: "Login successful",
      token, 
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(404).send(error.message);
    console.log(error.message);
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    // Clear cookie with same options used to set it
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    };

    res.clearCookie("token", cookieOptions);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(404).send(error.message);
    console.log(error.message);
  }
};
