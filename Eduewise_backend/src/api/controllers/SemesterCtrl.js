import SemesterService from "../../services/semester-service.js";

const semesterService = new SemesterService();

const SemesterCtrl = {
  registerSemester: async (req, res, next) => {
    try {
      const response = await semesterService.registerSemester(req.body);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  getSemesterDetails: async (req, res, next) => {
    try {
      const response = await semesterService.getSemesterDetails();
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  async uploadPaymentSlip(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No payment slip uploaded"
        });
      }

      const paymentData = {
        paymentDate: req.body.paymentDate,
        paymentAmount: req.body.paymentAmount,
        bankName: req.body.bankName,
        transactionId: req.body.transactionId,
        studentId: req.body.studentId,
        paymentSlip: req.file
      };

      const result = await semesterService.uploadPaymentSlip(paymentData);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};

export default SemesterCtrl; 