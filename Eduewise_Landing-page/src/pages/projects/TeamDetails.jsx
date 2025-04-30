import React, { useEffect, useState } from "react";
import { Card, Table, Tag } from "antd";
import axios from "axios";

const TeamDetails = () => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!teamData) {
    return <div>No team data found</div>;
  }

  return (
    <div className="p-6">
      <Card title="Team Registration Details" className="mb-6">
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

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Registration Date:</h3>
          <p>{new Date(teamData.createdAt).toLocaleDateString()}</p>
        </div>
      </Card>
    </div>
  );
};

export default TeamDetails; 