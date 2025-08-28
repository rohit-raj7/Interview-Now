import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  userId: { type: String, required: true },   // You can take userId/email from frontend
  questions: [String],
  answers: [String],
  evaluations: String,                        // or Object if JSON
  date: { type: Date, default: Date.now }
});

// Create the model
const Result = mongoose.model("Result", resultSchema);

// Export the model
export default Result;
