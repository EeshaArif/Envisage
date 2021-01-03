import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const MessageSchema = new Schema({
  text: {
    type: String,
  },
  owner: {
    type: String,
  },
});
