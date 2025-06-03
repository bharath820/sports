import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: true
  },
  feedbackType: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { minimize: false });

const FeedbackModel = mongoose.model('feedback', feedbackSchema);

export default FeedbackModel;
