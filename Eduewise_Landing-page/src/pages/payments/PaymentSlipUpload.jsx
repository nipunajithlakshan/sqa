import React, { useState } from 'react';
import { Form, Input, DatePicker, Upload, Button, message, Card, Typography, Space } from 'antd';
import { UploadOutlined, BankOutlined, DollarOutlined, NumberOutlined, CalendarOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;

const PaymentSlipUpload = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  // Get registration details from location state
  const registrationDetails = location.state?.registrationDetails;

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      // Append payment details
      formData.append('paymentDate', values.paymentDate.format('YYYY-MM-DD'));
      formData.append('paymentAmount', values.paymentAmount);
      formData.append('bankName', values.bankName);
      formData.append('transactionId', values.transactionId);
      formData.append('studentId', registrationDetails?.studentId);
      
      // Append the file if it exists
      if (values.paymentSlip?.[0]?.originFileObj) {
        formData.append('paymentSlip', values.paymentSlip[0].originFileObj);
      }

      const response = await axios.post(
        "http://localhost:3001/admin/payment/upload",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        messageApi.success("Payment details uploaded successfully!");
        setTimeout(() => {
          navigate('/semester-registration');
        }, 1500);
      } else {
        messageApi.error(response.data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      messageApi.error(error.response?.data?.message || "Failed to upload payment details");
    } finally {
      setLoading(false);
    }
  };

  if (!registrationDetails) {
    return (
      <Card style={{ margin: '24px', textAlign: 'center' }}>
        <Title level={4}>No registration details found</Title>
        <Text>Please complete registration first</Text>
        <Button type="primary" onClick={() => navigate('/semester-registration')} style={{ marginTop: '16px' }}>
          Go to Registration
        </Button>
      </Card>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '24px auto', padding: '0 24px' }}>
      {contextHolder}
      
      <Card
        title={
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>Payment Details Upload</Title>
            <Text type="secondary">
              Please provide your payment information and upload the payment slip
            </Text>
          </div>
        }
        style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            paymentAmount: registrationDetails?.totalFee
          }}
        >
          <Form.Item
            name="paymentDate"
            label="Payment Date"
            rules={[{ required: true, message: 'Please select payment date' }]}
          >
            <DatePicker 
              style={{ width: '100%' }}
              prefix={<CalendarOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="paymentAmount"
            label="Payment Amount (Rs.)"
            rules={[{ required: true, message: 'Please enter payment amount' }]}
          >
            <Input 
              prefix={<DollarOutlined />}
              type="number"
              disabled
            />
          </Form.Item>

          <Form.Item
            name="bankName"
            label="Bank Name"
            rules={[{ required: true, message: 'Please enter bank name' }]}
          >
            <Input 
              prefix={<BankOutlined />}
              placeholder="Enter bank name"
            />
          </Form.Item>

          <Form.Item
            name="transactionId"
            label="Transaction ID"
            rules={[{ required: true, message: 'Please enter transaction ID' }]}
          >
            <Input 
              prefix={<NumberOutlined />}
              placeholder="Enter transaction ID"
            />
          </Form.Item>

          <Form.Item
            name="paymentSlip"
            label="Payment Slip"
            rules={[{ required: true, message: 'Please upload payment slip' }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
          >
            <Upload
              maxCount={1}
              beforeUpload={() => false}
              accept="image/*,.pdf"
            >
              <Button icon={<UploadOutlined />}>Select Payment Slip</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => navigate('/semester-registration')}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit Payment Details
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PaymentSlipUpload; 