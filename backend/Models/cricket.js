import mongoose from "mongoose";

const sportSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  slots: {
    type: [String],
    required: true
  },
  reviews: {
    type: [{
      id: String,
      review: String,
      userphoto: String,
      rating: String
    }],
    required: true
  }
}, { minimize: false });

const sportModel1 = mongoose.model('cricket', sportSchema);

export default sportModel1;

