import React from "react";
import { Button, Form, Input, Card, Typography, Space, Divider } from "antd";
import { UserOutlined, IdcardOutlined, BookOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const GroupRegistration = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/admin/group/register",
        values
      );

      if (response.data.success) {
        alert("Group registration successful!");
        navigate("/dashboard");
      } else {
        alert("Registration failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong during registration.");
    }
  };

  const MemberForm = ({ memberNumber, isLeader = false }) => (
    <Card 
      title={`Member ${memberNumber}${isLeader ? " (Team Leader)" : ""}`} 
      style={{ 
        marginBottom: 16,
        border: 'none',
        background: isLeader ? 'linear-gradient(145deg, #ffffff, #f0f2ff)' : '#ffffff',
      }}
      className="shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl"
      headStyle={{
        borderBottom: 'none',
        padding: '16px 24px',
        color: isLeader ? '#4f46e5' : '#1f2937',
        fontWeight: 600
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Form.Item
          name={[`member${memberNumber}`, "name"]}
          rules={[{ required: true, message: "Please input member's name!" }]}
        >
          <Input 
            prefix={<UserOutlined className="text-gray-400" />} 
            placeholder="Full Name" 
            size="large"
            className="rounded-xl border-gray-200 hover:border-indigo-400 focus:border-indigo-500"
          />
        </Form.Item>
        <Form.Item
          name={[`member${memberNumber}`, "studentId"]}
          rules={[{ required: true, message: "Please input student ID!" }]}
        >
          <Input 
            prefix={<IdcardOutlined className="text-gray-400" />} 
            placeholder="Student ID" 
            size="large"
            className="rounded-xl border-gray-200 hover:border-indigo-400 focus:border-indigo-500"
          />
        </Form.Item>
      </Space>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Title level={2} className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Group Registration
          </Title>
          <p className="text-gray-600 mt-2 text-lg">Please fill in the details of all team members</p>
        </div>

        <Card 
          className="shadow-xl rounded-2xl border-none"
          bodyStyle={{ padding: '24px' }}
        >
          <Form
            name="group_registration"
            onFinish={onFinish}
            layout="vertical"
            className="space-y-6"
          >
            <Form.Item
              name="moduleName"
              rules={[{ required: true, message: "Please input module name!" }]}
            >
              <Input 
                prefix={<BookOutlined className="text-gray-400" />}
                placeholder="Module Name" 
                size="large"
                className="rounded-xl border-gray-200 hover:border-indigo-400 focus:border-indigo-500"
              />
            </Form.Item>

            <Divider className="my-8 border-gray-200" />

            <MemberForm memberNumber={1} isLeader={true} />
            <MemberForm memberNumber={2} />
            <MemberForm memberNumber={3} />
            <MemberForm memberNumber={4} />

            <Form.Item className="mt-8">
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Register Group
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default GroupRegistration; 