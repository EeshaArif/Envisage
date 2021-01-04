import mongoose from "mongoose";
import { MessageSchema } from "../models/messageModel";

const Message = mongoose.model("Message", MessageSchema);

export const addNewMessage = (req, res) => {
  let newMessage = new Message(req.body);
  newMessage.save((err, message) => {
    if (err) {
      res.send(err);
    }
    res.json(message);
  });
};

export const getMessages = (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) {
      res.send(err);
    }
    res.json(messages);
  });
};
export const getUserMessages = (req, res) => {
  Message.find({ owner: req.params.user }, (err, messages) => {
    if (err) {
      res.send(err);
    }
    res.json(messages);
  });
};
