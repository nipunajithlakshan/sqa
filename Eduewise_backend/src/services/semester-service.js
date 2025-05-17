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

  async uploadPaymentSlip(paymentData) {
    try {
      const { paymentDate, paymentAmount, bankName, transactionId, studentId, paymentSlip } = paymentData;
      
      // Validate required fields
      if (!paymentDate || !paymentAmount || !bankName || !transactionId || !studentId || !paymentSlip) {
        throw new Error('Missing required payment details');
      }

      // Save payment details to database
      const paymentRecord = {
        studentId,
        paymentDate,
        amount: paymentAmount,
        bankName,
        transactionId,
        slipPath: paymentSlip.path,
        status: 'pending',
        createdAt: new Date()
      };

      // TODO: Add database logic to save payment record
      // For now, we'll just return success
      return {
        success: true,
        message: 'Payment details uploaded successfully',
        data: paymentRecord
      };
    } catch (error) {
      console.error('Error uploading payment slip:', error);
      throw error;
    }
  }
}

export default SemesterService; 