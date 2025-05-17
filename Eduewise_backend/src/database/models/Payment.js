import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  paymentDate: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  slipPath: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment; 