import Semester from "../models/semesterModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/payment-slips';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept only PDF and image files
    if (file.mimetype === 'application/pdf' || 
        file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and image files are allowed!'), false);
    }
  }
}).single('file');

class SemesterService {
  // ... (keep existing methods)

  async uploadPaymentSlip(req, res) {
    return new Promise((resolve, reject) => {
      upload(req, res, async (err) => {
        if (err) {
          return reject({
            success: false,
            message: err.message
          });
        }

        if (!req.file) {
          return reject({
            success: false,
            message: 'No file uploaded'
          });
        }

        try {
          const { studentId } = req.body;
          if (!studentId) {
            // Delete the uploaded file if studentId is missing
            fs.unlinkSync(req.file.path);
            return reject({
              success: false,
              message: 'Student ID is required'
            });
          }

          // Update the registration with payment slip information
          const updatedRegistration = await Semester.findOneAndUpdate(
            { studentId },
            { 
              paymentSlip: {
                filename: req.file.filename,
                path: req.file.path,
                mimetype: req.file.mimetype,
                uploadedAt: new Date()
              }
            },
            { new: true }
          );

          if (!updatedRegistration) {
            // Delete the uploaded file if registration not found
            fs.unlinkSync(req.file.path);
            return reject({
              success: false,
              message: 'Registration not found'
            });
          }

          resolve({
            success: true,
            message: 'Payment slip uploaded successfully',
            data: updatedRegistration
          });
        } catch (error) {
          // Delete the uploaded file if there's an error
          if (req.file) {
            fs.unlinkSync(req.file.path);
          }
          reject({
            success: false,
            message: error.message
          });
        }
      });
    });
  }
}

export default new SemesterService(); 