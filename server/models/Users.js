import mongoose from 'mongoose';
import LocalMongoose from 'passport-local-mongoose';
import { request } from 'http';
import uuid from 'uuid/v4';

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  sid: {
    type: String,
    required: true,
    default: uuid,
  },
  username: {
    type: String,
    trim: true,
    unique: true,
  },
  userType: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    default: 'user',
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

usersSchema.plugin(LocalMongoose);

export default mongoose.model('Users', usersSchema);