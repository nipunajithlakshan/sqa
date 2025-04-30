import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Card, Table, Tag } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
};

const GroupRegistration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3001/admin/team/details");
        console.log("Team details response:", response.data);
        if (response.data.success) {
          setTeamData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching team details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      console.log("Form values:", values);
      const teamMembers = [
        { name: values.teamMember1Name, studentId: values.teamMember1Id },
        { name: values.teamMember2Name, studentId: values.teamMember2Id },
        { name: values.teamMember3Name, studentId: values.teamMember3Id },
        { name: values.teamMember4Name, studentId: values.teamMember4Id }
      ].filter(member => member.name && member.studentId);

      console.log("Sending team data to backend:", {
        teamMembers,
        moduleName: values.moduleName
      });

      const response = await axios.post(
        "http://localhost:3001/admin/team/register",
        {
          teamMembers,
          moduleName: values.moduleName
        }
      );

      console.log("Backend response:", response.data);

      if (response.data.success) {
        alert("Group Registration successful!");
        handleCancel();
        // Refresh team data after successful registration
        const updatedResponse = await axios.get("http://localhost:3001/admin/team/details");
        if (updatedResponse.data.success) {
          setTeamData(updatedResponse.data.data);
        }
      } else {
        alert("Registration failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong during registration.");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "Role",
      key: "role",
      render: (_, record, index) => (
        <Tag color={index === 0 ? "blue" : "green"}>
          {index === 0 ? "Team Leader" : "Team Member"}
        </Tag>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card title="Team Registration" className="mb-6">
        <Button type="primary" onClick={showModal}>
          Register New Team
        </Button>

        {loading ? (
          <div className="mt-4">Loading...</div>
        ) : teamData ? (
          <div className="mt-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Module Name:</h3>
              <p className="text-xl">{teamData.moduleName}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Team Members:</h3>
              <Table
                columns={columns}
                dataSource={teamData.teamMembers}
                rowKey="studentId"
                pagination={false}
              />
            </div>
          </div>
        ) : (
          <div className="mt-4">No team data found</div>
        )}
      </Card>

      <Modal
        title="Group Registration"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form
          {...layout}
          form={form}
          name="group-registration"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="moduleName"
            label="Module Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <h3 className="text-xl font-semibold mb-4 mt-6">Team Members</h3>

          <div className="mb-4">
            <h4 className="text-lg font-medium mb-2">Member 1 (Team Leader)</h4>
            <Form.Item
              name="teamMember1Name"
              label="Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="teamMember1Id"
              label="Student ID"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium mb-2">Member 2</h4>
            <Form.Item
              name="teamMember2Name"
              label="Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="teamMember2Id"
              label="Student ID"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium mb-2">Member 3</h4>
            <Form.Item
              name="teamMember3Name"
              label="Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="teamMember3Id"
              label="Student ID"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium mb-2">Member 4</h4>
            <Form.Item
              name="teamMember4Name"
              label="Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="teamMember4Id"
              label="Student ID"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Register Group
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GroupRegistration;
