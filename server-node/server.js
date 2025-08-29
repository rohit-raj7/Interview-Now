import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routers/user.js";  
import resultRouter from "./routers/result.js";  

const app = express();

// Connect DB
await connectDB();

const allowedOrigins = ["http://localhost:3001","https://ai-interviewnow.vercel.app"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// ===== Routes =====
app.get("/", (req, res) => res.send("✅ API Working"));
app.use("/api/users", userRouter);    // All user-related routes
app.use("/api/results", resultRouter); // All results-related routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
