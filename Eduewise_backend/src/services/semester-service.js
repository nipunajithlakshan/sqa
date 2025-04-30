import SemesterRegistration from "../database/models/SemesterRegistration.js";

const SPECIALIZATION_FEES = {
  'Software Engineering': 100000,
  'Cyber Security': 200000,
  'Data Science': 150000,
  'Network Engineering': 180000
};

const MODULE_FEE = 20000;

class SemesterService {
  async registerSemester(data) {
    try {
      const { specialization, selectedModules } = data;
      
      // Calculate total fee based on specialization and selected modules
      const specializationFee = SPECIALIZATION_FEES[specialization] || 0;
      const moduleFee = selectedModules.length * MODULE_FEE;
      const totalFee = specializationFee + moduleFee;

      const registration = new SemesterRegistration({
        ...data,
        totalFee
      });

      const savedRegistration = await registration.save();

      return {
        success: true,
        message: "Semester registration successful",
        data: savedRegistration
      };
    } catch (error) {
      console.error("Semester registration error:", error);
      return {
        success: false,
        message: error.message || "Failed to register semester",
        data: null
      };
    }
  }

  async getSemesterDetails() {
    try {
      const registrations = await SemesterRegistration.find()
        .sort({ createdAt: -1 });

      return {
        success: true,
        message: "Semester details retrieved successfully",
        data: registrations
      };
    } catch (error) {
      console.error("Error fetching semester details:", error);
      return {
        success: false,
        message: error.message || "Failed to fetch semester details",
        data: null
      };
    }
  }

  async uploadPaymentSlip(file) {
    try {
      if (!file) {
        throw new Error("No file uploaded");
      }

      // Find the most recent active registration
      const activeRegistration = await SemesterRegistration.findOne({ isActive: true })
        .sort({ createdAt: -1 });

      if (!activeRegistration) {
        throw new Error("No active registration found");
      }

      // Update the database with the file information
      const updatedRegistration = await SemesterRegistration.findByIdAndUpdate(
        activeRegistration._id,
        { 
          paymentSlipPath: file.path,
          paymentSlipName: file.originalname,
          paymentStatus: 'uploaded',
          isActive: false // Mark the registration as completed
        },
        { new: true }
      );

      return {
        success: true,
        message: "Payment slip uploaded successfully",
        data: {
          filename: file.originalname,
          path: file.path,
          registration: updatedRegistration
        }
      };
    } catch (error) {
      console.error("Payment slip upload error:", error);
      return {
        success: false,
        message: error.message || "Failed to upload payment slip",
        data: null
      };
    }
  }
}

export default SemesterService; 