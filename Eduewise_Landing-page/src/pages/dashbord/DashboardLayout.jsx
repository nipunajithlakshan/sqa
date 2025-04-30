import React from "react";
import {
  TeamOutlined,
  BookFilled,
  FileFilled,
  SettingFilled,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      icon: <TeamOutlined className="text-lg text-gray-600" />,
      label: <span className="text-gray-800">Registration</span>,
      children: [
        {
          key: "11",
          label: "Group Registration",
          onClick: () => navigate("/dashboard/registration"),
        },
        {
          key: "12",
          label: "Semester Registration",
          onClick: () => navigate("/dashboard/semester-registration"),
        },
      ],
    },
    {
      key: "2",
      icon: <BookFilled className="text-lg text-gray-600" />,
      label: <span className="text-gray-800">Assignments</span>,
      children: [
        {
          key: "21",
          label: "Submissions",
          onClick: () => navigate("/dashboard/assignment"),
        },
        {
          key: "22",
          label: "Grades",
          onClick: () => navigate("/dashboard/grades"),
        },
      ],
    },
    {
      key: "3",
      icon: <FileFilled className="text-lg text-gray-600" />,
      label: <span className="text-gray-800">Documents</span>,
      children: [
        {
          key: "31",
          label: "Course Materials",
          onClick: () => navigate("/dashboard/materials"),
        },
        {
          key: "32",
          label: "Study Resources",
          onClick: () => navigate("/dashboard/resources"),
        },
      ],
    },
    {
      key: "4",
      icon: <SettingFilled className="text-lg text-gray-600" />,
      label: <span className="text-gray-800">Settings</span>,
      children: [
        {
          key: "41",
          label: "Profile Settings",
          onClick: () => navigate("/dashboard/profile"),
        },
        {
          key: "42",
          label: "Account Settings",
          onClick: () => navigate("/dashboard/account"),
        },
      ],
    },
  ];

  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={["11"]}
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontWeight: 500,
        fontSize: 16,
      }}
      items={items}
      theme="light"
    />
  );
};

export default DashboardLayout;
