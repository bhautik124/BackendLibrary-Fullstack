const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 5000;

// CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      process.env.FRONTEND_URL, // Add your frontend URL in .env
      // Add your deployed frontend URL here
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import required file
const connectDB = require("./utils/db");

// Import routes
const uuidRouter = require("./router/uuid router/uniqueIdRouter");
const authRouter = require("./router/features/Auth/BeginnerAuth/authRouter");
const adminRouter = require("./router/admin router/adminRouter");
const userRouter = require("./router/user router/userRouter");
const roleBasedAuthRouter = require("./router/features/Auth/roleBasedAuth/roleBasedAuthRouter");
const emailOtpAuthRouter = require("./router/features/Auth/emailOtpAuth/emailOtpAuthRouter");
const googleAuthRouter = require("./router/features/Auth/googleAuth/googleAuthRouter");
const dynamicSchemaRouter = require("./router/features/crud/withoutImage/dynamicSchemaRouter");
const dynamicSchemaWithImgRouter = require("./router/features/crud/withImage/crudWithImgRouter")
const otherFeaturesRouter = require("./router/features/otherFeatures/otherFeaturesRouter")
// Use routes
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
//api generate and use this api
app.use("/api", uuidRouter);
// router which use generated api
app.use("/api", authRouter);
app.use("/api", roleBasedAuthRouter);
app.use("/api", emailOtpAuthRouter);
app.use("/api", googleAuthRouter);
app.use("/api", dynamicSchemaRouter);
app.use("/api" , dynamicSchemaWithImgRouter)
//other features router 
app.use("/api" , otherFeaturesRouter)

// DB Connect and Start Server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
