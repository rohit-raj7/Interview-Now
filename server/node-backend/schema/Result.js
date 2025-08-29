// import mongoose from "mongoose";

// const resultSchema = new mongoose.Schema({
//   userId: { type: String, required: true },   // You can take userId/email from frontend
//   questions: [String],
//   answers: [String],
//   evaluations: String,                        // or Object if JSON
//   date: { type: Date, default: Date.now }
// });

// // Create the model
// const Result = mongoose.model("Result", resultSchema);

// // Export the model
// export default Result;



import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  userId: { type: String },  // either Mongo _id or Google sub
  email: { type: String },   // fallback when no userId
  questions: [String],
  answers: [String],
  evaluations: String,
  date: { type: Date, default: Date.now }
});

// Ensure at least one identifier exists
resultSchema.pre("save", function (next) {
  if (!this.userId && !this.email) {
    next(new Error("Either userId or email is required"));
  } else {
    next();
  }
});

const Result = mongoose.model("Result", resultSchema);
export default Result;
