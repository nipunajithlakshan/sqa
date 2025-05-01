import Payment from '../database/models/Payment.js';

class PaymentService {
  async uploadPaymentDetails(paymentData) {
    try {
      const { paymentDate, paymentAmount, bankName, transactionId, studentId, paymentSlip } = paymentData;
      
      // Validate required fields
      if (!paymentDate || !paymentAmount || !bankName || !transactionId || !studentId || !paymentSlip) {
        throw new Error('Missing required payment details');
      }

      // Check if transaction ID already exists
      const existingPayment = await Payment.findOne({ transactionId });
      if (existingPayment) {
        throw new Error('Transaction ID already exists');
      }

      // Create new payment record
      const paymentRecord = new Payment({
        studentId,
        paymentDate: new Date(paymentDate),
        amount: parseFloat(paymentAmount),
        bankName,
        transactionId,
        slipPath: paymentSlip.path,
        status: 'pending'
      });

      // Save to database
      const savedPayment = await paymentRecord.save();

      return {
        success: true,
        message: 'Payment details uploaded successfully',
        data: savedPayment
      };
    } catch (error) {
      console.error('Error uploading payment details:', error);
      throw error;
    }
  }

  async getPaymentDetails(studentId) {
    try {
      const payments = await Payment.find({ studentId }).sort({ createdAt: -1 });
      return {
        success: true,
        data: payments
      };
    } catch (error) {
      console.error('Error fetching payment details:', error);
      throw error;
    }
  }
}

export default PaymentService; 