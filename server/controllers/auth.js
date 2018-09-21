import regeneratorRuntime from "regenerator-runtime";
import passport from "passport";

import Users from "../models/Users";
import { resolve } from "path";
import cfg from "./config";
import jwt from "jsonwebtoken";
import PassportJWT from "passport-jwt";
export const Register = (req, res) => {
  let user = req.user
  userRegister(req.body)
    .then(user => {
      return res.json({
        message: "Registered Successfully",
        user: { ...user }
      });
    })
    .catch(err => {
      return res.status(400).json({
        message: err.message
      });
    });
};

const userRegister = (body, user) => {
  let type = body.userType;
  let newUser = new Users({
    ...body,
    userType: type
  });

  return new Promise((resolve, reject) => {
    Users.register(newUser, body.password, (err, user) => {
      if (err) {
        reject(err);
      }
      resolve(user);
    });
  });
};

export const Login = (req, res) => {
  let user = req.user
  return res.json({
    message: 'Login Successful',
    user: {
      ...req.user,
      salt: undefined,
      hash: undefined,
    },
  })
}


// Get user data from client side
export const AuthMe = (req, res) => {
  if (req.user) {
    return res.json({
      authenticated: true,
      user: req.user
    });
  }
  return res.json({
    authenticated: false
  });
};

// Auth Middleware
export const RedirectNoAuth = (req, res, next) => {
  let user = req.user
  if (!user) {
    return res.redirect("/");
  }
  return next();
};

export const Logout = (req, res) => {
  req.logout();
  res.json({
    message: "Logout"
  });
};
