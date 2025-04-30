import React, { useState } from "react";
import { Button, Checkbox, Flex, Form, Input, message } from "antd";
import axios from "axios"; // ✅ import axios
import LoginImage from "../../assets/image/loginImage.jpeg";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/admin/user/signin",
        {
          email: values.email,
          password: values.password,
        }
      );

      if (response.data.success) {
        setLoginError(""); // Clear any previous error
        message.success("Login successful!");
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("username", response.data.data.userName);
        console.log(response.data.data.username); // assuming the API returns `name`

        navigate("/dashboard");
      } else {
        setLoginError(response.data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Left side - Image */}
      <div className="hidden md:flex items-center justify-center w-1/2 p-4">
        <img src={LoginImage} alt="Login" className="max-w-full h-auto" />
      </div>

      {/* Right side - Form */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#211264]">
          Sign In
        </h2>
        {/* Error message */}
        {loginError && (
          <div className="w-full max-w-md mb-4 px-4 py-3 text-red-800 bg-red-100 border border-red-300 rounded-lg shadow-sm text-sm text-center">
            {loginError}
          </div>
        )}
        <Form
          name="login"
          initialValues={{ remember: true }}
          //   style={{ maxWidth: 360 }}
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 400, width: "100%" }}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="">Forgot password</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Sign in
            </Button>
            or <a href="/register">Register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
