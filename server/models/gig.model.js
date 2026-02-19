import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    trim: true,
  },
  // Optional legacy/client-compatible fields
  desc: {
    type: String,
    trim: true,
  },
  cat: {
    type: String,
    trim: true,
  },
  shortTitle: {
    type: String,
    trim: true,
  },
  shortDesc: {
    type: String,
    trim: true,
  },
  deliveryTime: {
    type: Number,
    min: 0,
  },
  revisionNumber: {
    type: Number,
    min: 0,
  },
  cover: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  },
  features: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Gig", GigSchema);
