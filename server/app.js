import express from "express";
import path, { resolve } from "path";
import fs from 'fs'
import logger from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes";
import cors from "cors";
import fileUpload from "express-fileupload";
import uuid from "uuid/v4";
import cloudinary from "cloudinary";
import { CreateProduct, DeleteProduct } from "./controllers/api";

require("dotenv").config();

const app = express();
app.disable("x-powered-by");

mongoose.connect(
  process.env.db,
  err => {
    if (err) {
      console.error(err);
      process.exit(1);
      return;
    }
    console.log("Database Connected Successfully!");
  }
);

dotenv.config({
  configPath:
    process.env.NODE_ENV === "production" ? "../config/prod" : "../config/dev"
});

app.use(
  logger("dev", {
    skip: () => app.get("env") === "test"
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://wiwahub.herokuapp.com/",
    credentials: true
  })
);
app.use(morgan("dev"));
app.use(fileUpload());
app.use("/images", express.static(path.join(__dirname, "public")));

// app.engine('html', require('ejs').renderFile)
// app.set('view engine', 'ejs')
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
      function(err) {
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

app.post("/api/createProduct", (req, res) => {
  const user = JSON.parse(req.headers.user);
  console.log(user)
  let imageFile = req.files.file;
  uploadFile(imageFile)
    .then(result => CreateProduct(req, res, result))
    .catch(err => res.status(500).json({ error: err }));
});

app.post('/api/deleteProduct/:id', (req, res) => {
  let public_id = req.body.picName
  deleteImage(public_id)
    .then(result => DeleteProduct(req, res, result))
    .catch(err => res.status(500).json({error: err}) )
})


// Routes
app.use("/", routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 500).send({
    error: "Error 500",
    message: "Error getting requested url"
  });
});

export default app;
