import express from "express";
import User from "../schema/User.js";

const router = express.Router();

// Google login/signup
router.post("/google", async (req, res) => {
  try {
    const { sub, email, name, picture } = req.body;
    let user = await User.findOne({ googleId: sub });

    if (!user) {
      // New user signup
      user = new User({ googleId: sub, email, name, picture });
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error saving user:", error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

export default router;
