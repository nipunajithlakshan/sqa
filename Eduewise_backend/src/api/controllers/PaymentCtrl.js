import PaymentService from "../../services/payment-service.js";

const paymentService = new PaymentService();

const PaymentCtrl = {
  async uploadPaymentDetails(req, res, next) {
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

      const result = await paymentService.uploadPaymentDetails(paymentData);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async getPaymentDetails(req, res, next) {
    try {
      const { studentId } = req.params;
      const result = await paymentService.getPaymentDetails(studentId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};

export default PaymentCtrl; 