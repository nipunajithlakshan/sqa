import React from "react";
import { Button, Form, Input } from "antd";
import RegisterImage from "../../assets/image/loginImage.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const Registration = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const userData = values.user;

      const response = await axios.post(
        "http://localhost:3001/admin/user/register",
        {
          ...userData,
        }
      );

      if (response.data.success) {
        alert("Registration successful!");
        navigate("/login"); // ✅ Redirect after success
      } else {
        alert("Registration failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong during registration.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Left side - Image */}
      <div className="hidden md:flex items-center justify-center w-1/2 p-4">
        <img src={RegisterImage} alt="Login" className="max-w-full h-auto" />
      </div>

      {/* Right side - Form */}
      <div className="flex-col items-center justify-center w-full md:w-1/2 p-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#211264]">
          Sign up
        </h2>

        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "userName"]}
            label="Username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "firstName"]}
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "lastName"]}
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "password"]}
            label="Password"
            rules={[{ required: true }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
