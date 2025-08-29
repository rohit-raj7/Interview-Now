// import express from "express";
// import Result from "../schema/Result.js";

// const router = express.Router();

// // Save interview result
// router.post("/", async (req, res) => {
//   try {
//     const { userId, questions, answers, evaluations } = req.body;

//     if (!userId) {
//       return res.status(400).json({ error: "userId is required" });
//     }

//     const newResult = new Result({
//       userId,
//       questions,
//       answers,
//       evaluations,
//     });

//     await newResult.save();
//     res.status(201).json({ message: "✅ Result saved successfully!", result: newResult });
//   } catch (error) {
//     console.error("❌ Error saving result:", error);
//     res.status(500).json({ error: "Error saving result" });
//   }
// });

// // Get results for a user
// router.get("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const results = await Result.find({ userId }).sort({ date: -1 }); // latest first
//     res.json(results);
//   } catch (error) {
//     console.error("❌ Error fetching results:", error);
//     res.status(500).json({ error: "Error fetching results" });
//   }
// });

// export default router;



import express from "express";
import Result from "../schema/Result.js";

const router = express.Router();

// Save interview result
router.post("/", async (req, res) => {
  try {
    const { userId, email, questions, answers, evaluations } = req.body;

    if (!userId && !email) {
      return res.status(400).json({ error: "userId or email is required" });
    }

    const newResult = new Result({
      userId,
      email,
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

// Get results by userId or email
router.get("/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;

    let results;
    if (identifier.includes("@")) {
      // Email lookup
      results = await Result.find({ email: identifier }).sort({ date: -1 });
    } else {
      // userId lookup
      results = await Result.find({ userId: identifier }).sort({ date: -1 });
    }

    res.json(results);
  } catch (error) {
    console.error("❌ Error fetching results:", error);
    res.status(500).json({ error: "Error fetching results" });
  }
});

export default router;
