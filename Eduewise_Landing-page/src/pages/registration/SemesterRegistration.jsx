import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Modal, Card, Typography, Table, Tag, message, Upload, App, Space, Divider, Row, Col, Statistic } from "antd";
import { UploadOutlined, UserOutlined, IdcardOutlined, CalendarOutlined, MailOutlined, PhoneOutlined, BookOutlined,  CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined, ReloadOutlined, ClockCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Option } = Select;

// Modern styles
const styles = `
  .registration-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }

  .header-section {
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    padding: 24px;
    border-radius: 12px;
    margin-bottom: 24px;
    color: white;
  }

  .stats-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s;
  }

  .stats-card:hover {
    transform: translateY(-4px);
  }

  .registration-table {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
  
  .registration-table .ant-table-thead > tr > th {
    background: #f8f9fa;
    font-weight: 600;
    color: #1a1a1a;
    padding: 16px;
    border-bottom: 2px solid #f0f0f0;
  }
  
  .registration-table .ant-table-tbody > tr > td {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .registration-table .ant-table-tbody > tr:hover > td {
    background: #f8f9fa;
  }

  .registration-table .ant-table-pagination {
    margin: 16px;
    padding: 16px;
    border-top: 1px solid #f0f0f0;
  }

  .registration-table .ant-pagination-item {
    border-radius: 4px;
  }

  .registration-table .ant-pagination-item-active {
    background: #1890ff;
    border-color: #1890ff;
  }

  .registration-table .ant-pagination-item-active a {
    color: white;
  }

  .registration-table .ant-table-row {
    transition: all 0.3s;
  }

  .registration-table .ant-table-row:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .payment-notification {
    background: #fff1f0;
    border: 1px solid #ffa39e;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 24px;
  }

  .module-tag {
    margin: 4px;
    border-radius: 4px;
  }

  .fee-card {
    background: #f6ffed;
    border: 1px solid #b7eb8f;
    border-radius: 12px;
    padding: 16px;
  }

  .ant-card-head {
    border-bottom: none;
  }

  .ant-card-head-title {
    font-size: 18px;
    font-weight: 600;
  }

  .ant-btn-primary {
    height: 40px;
    padding: 0 24px;
    border-radius: 8px;
  }

  .ant-modal-content {
    border-radius: 12px;
  }

  .ant-form-item-label > label {
    font-weight: 500;
  }

  .ant-select-selector {
    border-radius: 8px !important;
  }

  .ant-input {
    border-radius: 8px;
  }
`;

const MODULES = {
  'Software Engineering': [
    { name: 'Advanced Programming', fee: 20000 },
    { name: 'Software Architecture', fee: 20000 },
    { name: 'Database Systems', fee: 20000 },
    { name: 'Web Development', fee: 20000 },
    { name: 'Mobile App Development', fee: 20000 }
  ],
  'Cyber Security': [
    { name: 'Network Security', fee: 20000 },
    { name: 'Ethical Hacking', fee: 20000 },
    { name: 'Cryptography', fee: 20000 },
    { name: 'Security Management', fee: 20000 },
    { name: 'Digital Forensics', fee: 20000 }
  ],
  'Data Science': [
    { name: 'Machine Learning', fee: 20000 },
    { name: 'Big Data Analytics', fee: 20000 },
    { name: 'Data Visualization', fee: 20000 },
    { name: 'Statistical Analysis', fee: 20000 },
    { name: 'Deep Learning', fee: 20000 }
  ],
  'Network Engineering': [
    { name: 'Network Design', fee: 20000 },
    { name: 'Routing Protocols', fee: 20000 },
    { name: 'Network Security', fee: 20000 },
    { name: 'Wireless Networks', fee: 20000 },
    { name: 'Cloud Computing', fee: 20000 }
  ]
};

const SPECIALIZATION_FEES = {
  'Software Engineering': 100000,
  'Cyber Security': 200000,
  'Data Science': 150000,
  'Network Engineering': 180000
};

const SemesterRegistration = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedModules, setSelectedModules] = useState([]);
  const [totalFee, setTotalFee] = useState(0);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPaymentNotification, setShowPaymentNotification] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/admin/semester/details");
      if (response.data.success) {
        setRegistrations(response.data.data);
        const hasUnpaidRegistration = response.data.data.some(
          reg => reg.isActive && (!reg.paymentSlipPath || reg.paymentStatus === 'pending')
        );
        setShowPaymentNotification(hasUnpaidRegistration);
      } else {
        messageApi.error("Failed to fetch registrations");
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
      if (error.code === 'ERR_NETWORK') {
        messageApi.error("Could not connect to the server. Please check if the backend is running.");
      } else {
        messageApi.error("Error fetching registrations");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSelectedSpecialization('');
    setSelectedModules([]);
    setTotalFee(0);
  };

  const handleSpecializationChange = (value) => {
    setSelectedSpecialization(value);
    setSelectedModules([]);
    calculateFee(value, []);
  };

  const handleModuleChange = (value) => {
    setSelectedModules(value);
    calculateFee(selectedSpecialization, value);
  };

  const calculateFee = (specialization, modules) => {
    const specializationFee = SPECIALIZATION_FEES[specialization] || 0;
    const moduleFee = modules.reduce((total, moduleName) => {
      const module = MODULES[specialization]?.find(m => m.name === moduleName);
      return total + (module?.fee || 0);
    }, 0);
    const total = specializationFee + moduleFee;
    setTotalFee(total);
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/admin/semester/register",
        {
          ...values,
          selectedModules,
          totalFee
        }
      );

      if (response.data.success) {
        messageApi.success("Semester Registration successful!");
        navigate('/payment-upload', { 
          state: { 
            registrationDetails: response.data.data 
          } 
        });
      } else {
        messageApi.error("Registration failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.code === 'ERR_NETWORK') {
        messageApi.error("Could not connect to the server. Please check if the backend is running.");
      } else {
        messageApi.error("Something went wrong during registration.");
      }
    }
  };

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('paymentSlip', file);
      formData.append('studentId', registrations[0]?.studentId);
      
      const response = await axios.post(
        "http://localhost:3001/admin/semester/upload-payment",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        messageApi.success("Payment slip uploaded successfully!");
        setShowPaymentNotification(false);
        fetchRegistrations();
      } else {
        messageApi.error(response.data.message || "File upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      if (error.response) {
        messageApi.error(error.response.data.message || "File upload failed. Please try again.");
      } else if (error.request) {
        messageApi.error("Could not connect to the server. Please check if the backend is running.");
      } else {
        messageApi.error("Something went wrong during upload.");
      }
    }
  };

  const moduleColumns = [
    {
      title: 'Module Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Fee (Rs.)',
      dataIndex: 'fee',
      key: 'fee',
      render: (fee) => fee.toLocaleString(),
    }
  ];

  const registrationColumns = [
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
      width: '15%',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          <span style={{ fontWeight: 500 }}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
      width: '10%',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IdcardOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      key: 'specialization',
      width: '15%',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BookOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          <span style={{ fontWeight: 500 }}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Modules',
      dataIndex: 'selectedModules',
      key: 'selectedModules',
      width: '20%',
      render: (modules) => (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '4px'
        }}>
          {modules?.map((module, index) => (
            <div 
              key={`${module}-${index}`}
              style={{
                padding: '4px 8px',
                backgroundColor: '#f0f5ff',
                borderRadius: '4px',
                border: '1px solid #d6e4ff',
                fontSize: '12px',
                color: '#1d39c4'
              }}
            >
              {module}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Total Fee',
      dataIndex: 'totalFee',
      key: 'totalFee',
      width: '10%',
      render: (fee) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          
          <span style={{ fontWeight: 500 }}>Rs. {fee?.toLocaleString() || 0}</span>
        </div>
      ),
    },
    {
      title: 'Payment Status',
      key: 'paymentStatus',
      width: '10%',
      render: (_, record) => {
        let color = 'red';
        let text = 'Pending';
        let icon = null;
        
        if (record.paymentStatus === 'uploaded') {
          color = 'orange';
          text = 'Uploaded';
          icon = <UploadOutlined />;
        } else if (record.paymentStatus === 'verified') {
          color = 'green';
          text = 'Verified';
          icon = <CheckCircleOutlined />;
        } else if (record.paymentStatus === 'rejected') {
          color = 'red';
          text = 'Rejected';
          icon = <CloseCircleOutlined />;
        } else {
          icon = <ClockCircleOutlined />;
        }
        
        return (
          <Tag 
            color={color} 
            style={{ 
              borderRadius: '4px',
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {icon}
            {text}
          </Tag>
        );
      },
    },
    {
      title: 'Registration Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '10%',
      render: (date) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CalendarOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          <span>{date ? new Date(date).toLocaleDateString() : 'N/A'}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="registration-container">
      <style>{styles}</style>
      {contextHolder}

      <div className="header-section">
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ color: 'white', margin: 0 }}>Semester Registration</Title>
            <Text style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              Manage your semester registrations and payments
            </Text>
          </Col>
          <Col>
            <Button type="primary" size="large" onClick={showModal}>
              Register for New Semester
            </Button>
          </Col>
        </Row>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card className="stats-card">
            <Statistic
              title="Total Registrations"
              value={registrations.length}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="stats-card">
            <Statistic
              title="Semester Registration Fee"
              value={registrations.reduce((sum, reg) => sum + (reg.totalFee || 0), 0)}
              
              suffix="LKR"
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="stats-card">
            <Statistic
              title="Pending Payments"
              value={registrations.filter(reg => reg.paymentStatus === 'pending').length}
              prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
      </Row>

      
      <Card className="registration-table">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 16 
        }}>
          <Title level={4} style={{ margin: 0 }}>Registration History</Title>
          <Button 
            type="default" 
            onClick={fetchRegistrations} 
            loading={loading}
            icon={<ReloadOutlined />}
          >
            Refresh
          </Button>
        </div>
        <Table
          dataSource={registrations.map((reg, index) => ({
            key: reg._id || `reg-${index}`,
            ...reg
          }))}
          columns={registrationColumns}
          loading={loading}
          rowKey="key"
          scroll={{ x: 'max-content' }}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showTotal: (total) => (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: '8px',
                color: '#666'
              }}>
                <InfoCircleOutlined />
                <span>Total {total} registrations</span>
              </div>
            )
          }}
        />
      </Card>

      <Modal
        title="New Semester Registration"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="studentName"
                label="Student Name"
                rules={[{ required: true }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter student name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="studentId"
                label="Student ID"
                rules={[{ required: true }]}
              >
                <Input prefix={<IdcardOutlined />} placeholder="Enter student ID" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="currentYear"
                label="Current Year"
                rules={[{ required: true }]}
              >
                <Input prefix={<CalendarOutlined />} placeholder="Enter current year" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="registrationYear"
                label="Registration Year"
                rules={[{ required: true }]}
              >
                <Input prefix={<CalendarOutlined />} placeholder="Enter registration year" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: 'email' }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Enter email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="contactNumber"
                label="Contact Number"
                rules={[{ required: true }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Enter contact number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="specialization"
            label="Specialization"
            rules={[{ required: true }]}
          >
            <Select
              onChange={handleSpecializationChange}
              placeholder="Select specialization"
              suffixIcon={<BookOutlined />}
            >
              {Object.keys(SPECIALIZATION_FEES).map(spec => (
                <Option key={spec} value={spec}>{spec}</Option>
              ))}
            </Select>
          </Form.Item>

          {selectedSpecialization && (
            <Form.Item
              name="modules"
              label="Select Modules"
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                onChange={handleModuleChange}
                placeholder="Select modules"
                suffixIcon={<BookOutlined />}
              >
                {MODULES[selectedSpecialization].map(module => (
                  <Option key={module.name} value={module.name}>
                    {module.name} (Rs. {module.fee.toLocaleString()})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Card className="fee-card">
            <Title level={4}>Fee Calculation</Title>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Specialization Fee"
                  value={SPECIALIZATION_FEES[selectedSpecialization] || 0}
                  prefix="Rs."
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Module Fee"
                  value={selectedModules.reduce((total, moduleName) => {
                    const module = MODULES[selectedSpecialization]?.find(m => m.name === moduleName);
                    return total + (module?.fee || 0);
                  }, 0)}
                  prefix="Rs."
                />
              </Col>
            </Row>
            <Divider />
            <Statistic
              title="Total Fee"
              value={totalFee}
              prefix="Rs."
              valueStyle={{ color: '#52c41a', fontSize: '24px' }}
            />
          </Card>

          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" size="large" block>
              Complete Registration
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SemesterRegistration; 