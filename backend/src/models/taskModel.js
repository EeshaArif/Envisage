import mongoose from "mongoose";
const Schema = mongoose.Schema;
export const TaskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
    default: "Low",
  },
  status: {
    type: String,
    enum: ["To Do", "Doing", "Done"],
    default: "To Do",
  },
});
