import { Imageupload } from "../models/imageupload.model.js";
import AppError from "../utils/Error.js";
import request from "request-promise"; // To make HTTP requests to the ML model

export const uploadimage = async function (req, res, next) {
  try {
    const { name = "Plant", photo } = req.body;
    console.log("hi");

    // Step 1: Save image data in the database
    const newimage = await Imageupload.create({
      name,
      photo,
    });

    // Step 2: Send the Cloudinary URL to your ML model for inference
    const options = {
      method: "POST",
      uri: "https://sihflask-1.onrender.com/predict", // Replace with your ML model's API endpoint
      body: {
        image_url: photo, // Send the Cloudinary image URL
      },
      json: true, // Automatically stringifies the body to JSON and parses the response
    };

    const prediction = await request(options);

    // Step 3: Return the response including ML predictions
    res.status(201).json({
      status: "success",
      data: newimage,
      prediction, // Include the ML model's predictions
    });
  } catch (error) {
    console.log(error);

    next(new AppError(error.message, 500, error));
  }
};
