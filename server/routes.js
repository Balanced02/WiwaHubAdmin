import { Router } from "express";
import path from "path";
import passport from "passport";
import passportLocal from "passport-local";
import multer from "multer";
import connectMongo from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import Users from "./models/Users";
import Products from './models/Products'
import fileUpload from "express-fileupload";
import uuid from "uuid/v4";
import cloudinary from "cloudinary";
import morgan from "morgan";
import fs from 'fs'
import dotenv from "dotenv";
import cron from 'node-cron'

require("dotenv").config();

import { Register, Logout, Login, AuthMe, RedirectNoAuth } from "./controllers/auth";
import { GetProducts, ChangePremium, CreateProduct, DeleteProduct, MyAds, GetSummary } from "./controllers/api";

dotenv.config({
  configPath:
    process.env.NODE_ENV === "production" ? "../config/prod" : "../config/dev"
});

const router = Router();
const api = Router();

const MongoStore = connectMongo(session)
router.use(cookieParser())
router.use(
  session({
    secret: process.env.SESSION_SECRET || 'unkn0wn wiwahub s3Cret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 3.6e6, // 1 Hour session
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
)

var upload = multer({ dest: "./public/logos" });

// PassportJS Setup
router.use(passport.initialize());
router.use(passport.session())


const LocalStrategy = passportLocal.Strategy;
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser())
passport.deserializeUser(Users.deserializeUser())


router.use("/api", api);

api.get("/me", AuthMe);
api.get("/auth/logout", Logout);
api.post("/auth/register", Register);
api.post('/auth/login', passport.authenticate('local'), Login)

api.use(RedirectNoAuth)

api.use(morgan("dev"));
api.use(fileUpload());

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const uploadFile = imageFile => {
  fs.readdir(path.join(__dirname, "public"), (err, files) => {
    if (err) {
      console.log(err)
    };
    for (const file of files) {
      fs.unlink(path.join(path.join(__dirname, 'public'), file), err => {
        if (err) {
          console.log(err)
        }
      });
    }
  });
  return new Promise((resolve, reject) => {
    const newFilename = uuid();
    imageFile.mv(
      `${__dirname}/public/${newFilename}-${imageFile.name}`,
      function (err) {
        if (err) {
          console.log(err)
          reject(err);
        }
        cloudinary.uploader.upload(
          `${__dirname}/public/${newFilename}-${imageFile.name}`,
          result => {
            resolve(result);
          }
        );
      }
    );
  });
};

const deleteImage = public_id => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(public_id, (err, result) => {
      resolve(result)
    })
  })
}

api.post('/deleteProduct/:id', (req, res) => {
  let public_id = req.body.picName
  deleteImage(public_id)
    .then(result => DeleteProduct(req, res, result))
    .catch(err => res.status(500).json({ error: err }))
})


api.post('/getProducts/:id', GetProducts);
api.post('/getMyAds/:id', MyAds);
api.post('/changePremium', ChangePremium);
api.get("/getSummary", GetSummary)
api.post("/createProduct", (req, res) => {
  const user = req.user;
  let imageFile = req.files.file;
  uploadFile(imageFile)
    .then(result => CreateProduct(req, res, result))
    .catch(err => res.status(500).json({ error: err }));
});

cron.schedule("* * 1 * *", async () => {
  let oneday = 8.64e7
  let search = {
    $lt: (new Date(Date.now() - 14 * oneday)).toString()
  }
  try {
    let [products] = await Promise.all([Products.find({
      created: search
    })])
    if (products) {
      products.forEach(product => {
        deleteImage(product.picName)
        Products.findOneAndRemove({ _id: product._id })
      })
    }
  } catch (err) {
    console.log(err)
  }
})

export default router;
