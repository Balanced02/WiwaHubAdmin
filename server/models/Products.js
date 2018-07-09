import mongoose from 'mongoose';
import uuid from 'uuid/v4';

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  sid: {
    type: String,
    required: true,
    default: uuid,
  },
  username: {
    type: String,
    required: true,
  }, 
  product: {
    type: String,
    required: true,
  }, 
  location:{
    type: String,
    required: true,
  }, 
  premium:{
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model('Products', productsSchema);