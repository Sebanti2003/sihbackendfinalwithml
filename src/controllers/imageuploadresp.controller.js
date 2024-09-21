import { Imageupload } from "../models/imageupload.model.js";
import AppError from "../utils/Error.js";
import request from "request-promise"; // or consider using axios or node-fetch

export const uploadimage = async function (req, res, next) {
  try {
    const { photo } = req.body;

    if (!photo) {
      return next(new AppError("Image URL is required", 400));
    }

    // Step 1: Save image data in the database

    // Step 2: Send the Cloudinary URL to your ML model for inference
    const options = {
      method: "POST",
      uri: "http://localhost:8080/predict", // Replace with your ML model's API endpoint
      body: {
        image_url: photo, // Send the Cloudinary image URL
      },
      json: true, // Automatically stringifies the body to JSON and parses the response
    };

    try {
      const prediction = await request(options);
      // Step 3: Return the response including ML predictions

      const newimage = await Imageupload.create({
        name: prediction[0]["class_name"],
        photo,
      });
      const newimageget = await Imageupload.findById(newimage._id).select(
        "photo name -_id"
      );
      res.status(201).json({
        status: "success",
        data: newimageget,
        prediction: {
          classId: prediction[0]["class_id"],
          name: prediction[0]["class_name"],
          confidence: `${prediction[0]["confidence"] * 100}%`,
          box: prediction[0]["box"],
        }, // Include the ML model's predictions
      });
    } catch (mlError) {
      next(new AppError("Error from ML model: " + mlError.message, 500));
    }
  } catch (error) {
    console.log(error);
    next(new AppError(error.message, 500, error));
  }
};
export const deleteall = async function (req, res, next) {
  try {
    await Imageupload.deleteMany({});
    res.status(200).json({
      status: "success",
      message: "All info and images deleted",
    });
  } catch (error) {
    next(new AppError(error.message, 500, error));
  }
};
