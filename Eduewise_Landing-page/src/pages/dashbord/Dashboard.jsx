import React from "react";
import MainLayout from "../../layout/MainLayout";
import DashboardLayout from "./DashboardLayout";
import { Outlet } from "react-router-dom";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Layout } from "antd";

const { Header, Content } = Layout;

const Dashboard = () => {
  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header
        className="shadow-sm flex items-center justify-between px-8 py-0 sticky top-0 z-10"
        style={{
          background: "#fff",
          color: "#222",
          minHeight: 64,
          boxShadow: "0 2px 8px #f0f1f2"
        }}
      >
        <div className="flex items-center gap-8 w-full">
          <h1 className="text-2xl font-bold text-gray-800 mr-8">Eduwise</h1>
          <DashboardLayout />
        </div>
        <div className="flex items-center gap-6">
          <Badge count={5} className="cursor-pointer" color="#3B82F6">
            <BellOutlined className="text-xl text-gray-600 hover:text-gray-800 transition-colors duration-300" />
          </Badge>
          <div className="flex items-center gap-3 cursor-pointer group">
            <Avatar 
              icon={<UserOutlined />} 
              className="bg-gray-100 text-gray-600 group-hover:bg-gray-200 transition-all duration-300"
            />
            <div className="flex flex-col">
              <span className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors duration-300">John Doe</span>
              <span className="text-xs text-gray-500">Student</span>
            </div>
          </div>
        </div>
      </Header>
      <Content className="p-6">
        <div className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-8rem)] hover:shadow-md transition-all duration-300">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;
