import { Schema, model } from "mongoose";

const semesterRegistrationSchema = new Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    currentYear: {
      type: String,
      required: true,
    },
    registrationYear: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
      enum: ['Software Engineering', 'Cyber Security', 'Data Science', 'Network Engineering'],
    },
    selectedModules: [{
      type: String,
      required: true,
    }],
    totalFee: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    paymentSlipPath: {
      type: String,
      default: null,
    },
    paymentSlipName: {
      type: String,
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'uploaded', 'verified', 'rejected'],
      default: 'pending',
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const SemesterRegistration = model("SemesterRegistration", semesterRegistrationSchema);

export default SemesterRegistration; 