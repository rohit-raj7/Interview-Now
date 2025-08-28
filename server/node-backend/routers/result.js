import express from "express";
import Result from "../schema/Result.js";

const router = express.Router();

// Save interview result
router.post("/", async (req, res) => {
  try {
    const { userId, questions, answers, evaluations } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const newResult = new Result({
      userId,
      questions,
      answers,
      evaluations,
    });

    await newResult.save();
    res.status(201).json({ message: "✅ Result saved successfully!", result: newResult });
  } catch (error) {
    console.error("❌ Error saving result:", error);
    res.status(500).json({ error: "Error saving result" });
  }
});

// Get results for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await Result.find({ userId }).sort({ date: -1 }); // latest first
    res.json(results);
  } catch (error) {
    console.error("❌ Error fetching results:", error);
    res.status(500).json({ error: "Error fetching results" });
  }
});

export default router;
