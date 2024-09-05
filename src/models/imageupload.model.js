import mongoose from "mongoose";
const imageupload = new mongoose.Schema({
  name: {
    type: String,
  },
  photo: {
    type: String,
  },
},{
  timestamps: true,
});

export const Imageupload = mongoose.model("Imageupload", imageupload);
