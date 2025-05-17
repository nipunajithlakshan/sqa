import React, { useState, useEffect } from "react";
import { Modal, Table } from "antd";
import axios from "axios";
import { PlusOutlined, UserOutlined, IdcardOutlined, TeamOutlined, BookOutlined, CrownOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const GroupRegistration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/admin/team/details"
        );
        if (response.data.success) {
          setTeamData(response.data.data);
        }
      } catch (error) {
        setTeamData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamDetails();
  }, []);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    setFormValues({});
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
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
        message.success("Semester Registration successful!");
        // Redirect to payment page with registration details
        navigate('/payment-upload', { 
          state: { 
            registrationDetails: response.data.data 
          } 
        });
      } else {
        message.error("Registration failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.code === 'ERR_NETWORK') {
        message.error("Could not connect to the server. Please check if the backend is running.");
      } else {
        message.error("Something went wrong during registration.");
      }
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <span style={{ fontWeight: 700, fontSize: 16 }}>{text}</span>
      ),
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      render: (text) => (
        <span style={{ color: "#888", fontSize: 15 }}>{text}</span>
      ),
    },
    {
      title: "Role",
      key: "role",
      render: (_, record, index) => (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: index === 0 ? "#1976d2" : "#52c41a",
            color: "white",
            borderRadius: 12,
            padding: "4px 16px",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {index === 0 ? <CrownOutlined style={{ marginRight: 6 }} /> : null}
          {index === 0 ? "Team Leader" : "Team Member"}
        </span>
      ),
    },
  ];

  return (
    <div
      style={{
        background: "#f5f6fa",
        minHeight: "100vh",
        padding: "32px 0",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* Blue Header Bar */}
      <div
        style={{
          background: "linear-gradient(90deg, #1976d2 60%, #2196f3 100%)",
          borderRadius: 16,
          margin: "0 auto 32px auto",
          maxWidth: 1100,
          padding: "32px 32px 24px 32px",
          color: "white",
          boxShadow: "0 4px 24px rgba(25, 118, 210, 0.08)",
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <TeamOutlined
          style={{ fontSize: 48, color: "white", marginRight: 24 }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>
            Team Registration
          </div>
          <div style={{ fontSize: 18, opacity: 0.95 }}>
            Register and view your team
          </div>
        </div>
        <button
          onClick={showModal}
          style={{
            background: "linear-gradient(90deg, #1976d2 60%, #2196f3 100%)",
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "12px 28px",
            fontWeight: 700,
            fontSize: 16,
            boxShadow: "0 2px 8px #1976d2",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <PlusOutlined /> Register New Team
        </button>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto 24px auto",
          display: "flex",
          gap: 24,
        }}
      >
        <div
          style={{
            flex: 1,
            background: "white",
            borderRadius: 12,
            minHeight: 90,
            boxShadow: "0 2px 8px #e3e8ee",
            display: "flex",
            alignItems: "center",
            padding: 24,
            gap: 16,
          }}
        >
          <BookOutlined style={{ fontSize: 28, color: "#1976d2" }} />
          <div>
            <div style={{ color: "#888", fontSize: 14 }}>Module Name</div>
            <div style={{ fontWeight: 600, fontSize: 18 }}>
              {teamData?.moduleName || "-"}
            </div>
          </div>
        </div>
      </div>

      {/* Team Table Card */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          background: "white",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(25, 118, 210, 0.08)",
          padding: 32,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 24,
            color: "#1976d2",
          }}
        >
          Team Members
        </div>
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px 0",
              fontSize: 18,
              color: "#1976d2",
            }}
          >
            Loading...
          </div>
        ) : !teamData ||
          !teamData.teamMembers ||
          teamData.teamMembers.length === 0 ? (
          <div style={{ color: "#888", fontSize: 16 }}>No team data found</div>
        ) : (
          <Table
            columns={columns}
            dataSource={teamData.teamMembers}
            rowKey={(record, index) => `${record.studentId}-${index}`}
            pagination={false}
            style={{ borderRadius: 12, overflow: "hidden" }}
            bordered={false}
          />
        )}
      </div>

      {/* Modal for Registration */}
      <Modal
        title={
          <div style={{ fontSize: 28, fontWeight: 700, color: "#1976d2" }}>
            Group Registration
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
        style={{ borderRadius: 16 }}
        bodyStyle={{ padding: 32 }}
      >
        <form onSubmit={onFinish}>
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                fontWeight: 600,
                fontSize: 16,
                color: "#1976d2",
                display: "block",
                marginBottom: 8,
              }}
            >
              Module Name
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <BookOutlined style={{ fontSize: 20, color: "#1976d2" }} />
              <input
                type="text"
                name="moduleName"
                value={formValues.moduleName || ""}
                onChange={handleInputChange}
                required
                placeholder="Enter module name"
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #d9d9d9",
                  fontSize: 16,
                }}
              />
            </div>
          </div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              color: "#1976d2",
              marginBottom: 16,
            }}
          >
            Team Members
          </div>
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              style={{
                marginBottom: 20,
                background: "#f5f6fa",
                borderRadius: 8,
                padding: 16,
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  marginBottom: 8,
                  color: index === 1 ? "#1976d2" : "#333",
                }}
              >
                {index === 1 ? "Member 1 (Team Leader)" : `Member ${index}`}
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                <UserOutlined style={{ fontSize: 18, color: "#1976d2" }} />
                <input
                  type="text"
                  name={`teamMember${index}Name`}
                  value={formValues[`teamMember${index}Name`] || ""}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter name"
                  style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 8,
                    border: "1px solid #d9d9d9",
                    fontSize: 15,
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <IdcardOutlined style={{ fontSize: 18, color: "#1976d2" }} />
                <input
                  type="text"
                  name={`teamMember${index}Id`}
                  value={formValues[`teamMember${index}Id`] || ""}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter student ID"
                  style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 8,
                    border: "1px solid #d9d9d9",
                    fontSize: 15,
                  }}
                />
              </div>
            </div>
          ))}
          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(90deg, #1976d2 60%, #2196f3 100%)",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "14px 0",
              fontWeight: 700,
              fontSize: 18,
              marginTop: 12,
              cursor: "pointer",
              boxShadow: "0 2px 8px #1976d2",
            }}
          >
            Register Group
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default GroupRegistration;
