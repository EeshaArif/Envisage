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
    console.log(messages);
    res.json(messages);
  });
};
/*
export const getContactWithID = (req, res) => {
  Contact.findById(req.params.contactID, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};
export const updateContact = (req, res) => {
  Contact.findOneAndUpdate(
    { _id: req.params.contactID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    }
  );
};
export const deleteContact = (req, res) => {
  Contact.remove(
    { _id: req.params.contactID },

    (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "successfully deleted contact" });
    }
  );
};
*/
