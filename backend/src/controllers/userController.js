import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jsonwebtoken from "jsonwebtoken";
import { UserSchema } from "../models/userModel";

const User = mongoose.model("User", UserSchema);

export const getUser = (req, res) => {
  User.findById(req.user._id, (err, user) => {
    if (err) res.send(err);
    user.hashPassword = undefined;
    res.json(user);
  });
};
export const findUser = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};
export const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    req.body,
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        res.send(err);
      }
      user.hashPassword = undefined;
      res.json(user);
    }
  );
};

export const register = (req, res) => {
  const newUser = new User(req.body);
  newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      user.hashPassword = undefined;

      return sendToken(user, res);
    }
  });
};

export const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized User!" });
  }
};

export const login = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) throw err;
      if (!user) {
        return res
          .status(401)
          .json({ message: "Authentication Failed. No user found" });
      } else if (user) {
        if (!user.comparePassword(req.body.password, user.hashPassword)) {
          return res
            .status(401)
            .json({ message: "Authentication Failed. Wrong Password" });
        } else {
          return sendToken(user, res);
        }
      }
    }
  );
};

function sendToken(user, res) {
  return res.json({
    firstName: user.firstName,
    token: jwt.sign({ _id: user.id }, "RESTFULAPIs"),
  });
}

export function checkAuthenticated(req, res, next) {
  if (req.headers && req.headers.authorization) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      (err, decode) => {
        if (err) {
          req.user = undefined;
        }
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
}
