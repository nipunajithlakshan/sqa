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
          message: "No file uploaded"
        });
      }

      const result = await semesterService.uploadPaymentSlip(req.file);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};

export default SemesterCtrl; 