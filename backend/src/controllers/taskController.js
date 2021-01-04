import mongoose from "mongoose";
import { TaskSchema } from "../models/taskModel";

const Task = mongoose.model("Task", TaskSchema);

export const getAllTasks = (req, res) => {
  Task.find({}, (err, tasks) => {
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  });
};
export const getTask = (req, res) => {
  Task.findById(req.params.taskId, (err, task) => {
    if (err) res.send(err);
    res.json(task);
  });
};

export const addNewTask = (req, res) => {
  const newTask = new Task(req.body);
  newTask.save((err, task) => {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

export const updateTask = (req, res) => {
  Task.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true, useFindAndModify: false },
    (err, task) => {
      if (err) res.send(err);
      res.json(task);
    }
  );
};

export const deleteTask = (req, res) => {
  Task.deleteOne(
    {
      _id: req.params.taskId,
    },
    (err, task) => {
      if (err) res.send(err);
      res.json({ message: "Successfully deleted task!" });
    }
  );
};
