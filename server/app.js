import express from 'express';
import path, { resolve } from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import uuid from 'uuid/v4';
import cloudinary from 'cloudinary';

require('dotenv').config();

const app = express();
app.disable('x-powered-by');

mongoose.connect(process.env.db, err => {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  console.log('Database Connected Successfully!');
});

dotenv.config({
  configPath: process.env.NODE_ENV === 'production' ? '../config/prod' : '../config/dev',
});

app.use(
  logger('dev', {
    skip: () => app.get('env') === 'test',
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(fileUpload());
app.use('/images', express.static(path.join(__dirname, 'public')));

// app.engine('html', require('ejs').renderFile)
// app.set('view engine', 'ejs')
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

app.post('/api/uploadExamImages', (req, res, next) => {
  console.log(req.files.file);
  let imageFile = req.files.file;
  uploadFile(imageFile)
    .then(result => res.json({ file: result }))
    .catch(err => res.status(500).json({ error: err }));
});

const uploadFile = imageFile => {
  return new Promise((resolve, reject) => {
    const newFilename = uuid();
    imageFile.mv(`${__dirname}/public/${newFilename}-${imageFile.name}`, function(err) {
      if (err) {
        reject(err);
      }
      cloudinary.uploader.upload(`${__dirname}/public/${newFilename}-${imageFile.name}`, result => {
        resolve(result);
      });
    });
  });
};

app.post('/api/uploadFile', (req, res, next) => {
  let imageFile = req.files.file;
  uploadFile(imageFile)
    .then(result => res.json({ file: result }))
    .catch(err => res.status(500).json({ error: err }));
});

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 500).render('error', {
    error: err.status,
    message: err.message,
  });
});

export default app;
