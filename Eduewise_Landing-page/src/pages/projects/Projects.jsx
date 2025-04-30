import React, { useState } from "react";
import { Input, Select, Card, Tag, Button, Space, Avatar, Tooltip, Badge, Progress, Statistic, Row, Col, Radio, Divider } from "antd";
import { 
  SearchOutlined, 
  FilterOutlined, 
  PlusOutlined, 
  TeamOutlined, 
  ClockCircleOutlined,
  LaptopOutlined,
  MobileOutlined,
  BookOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined as ClockOutlined,
  ProjectOutlined,
  CalendarOutlined,
  BarChartOutlined
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Search } = Input;
const { Option } = Select;

const Projects = () => {
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  // Sample project data with categories
  const projects = [
    {
      id: 1,
      title: "E-Learning Platform",
      description: "Development of a comprehensive e-learning platform with interactive features",
      status: "in-progress",
      members: 5,
      deadline: "2024-06-30",
      progress: 65,
      category: "web",
      priority: "high",
      lastUpdated: "2024-02-15",
      tasks: 24,
      completedTasks: 15,
    },
    {
      id: 2,
      title: "Student Management System",
      description: "Modern student management system with attendance tracking",
      status: "completed",
      members: 3,
      deadline: "2024-03-15",
      progress: 100,
      category: "system",
      priority: "medium",
      lastUpdated: "2024-02-10",
      tasks: 18,
      completedTasks: 18,
    },
    {
      id: 3,
      title: "Mobile Learning App",
      description: "Cross-platform mobile application for on-the-go learning",
      status: "planned",
      members: 4,
      deadline: "2024-09-01",
      progress: 0,
      category: "mobile",
      priority: "high",
      lastUpdated: "2024-02-01",
      tasks: 0,
      completedTasks: 0,
    },
  ];

  // Calculate statistics
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === "completed").length;
  const inProgressProjects = projects.filter(p => p.status === "in-progress").length;
  const totalTasks = projects.reduce((sum, p) => sum + p.tasks, 0);
  const completedTasks = projects.reduce((sum, p) => sum + p.completedTasks, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "processing";
      case "planned":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircleOutlined />;
      case "in-progress":
        return <SyncOutlined spin />;
      case "planned":
        return <ClockOutlined />;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "web":
        return <LaptopOutlined />;
      case "mobile":
        return <MobileOutlined />;
      case "system":
        return <SettingOutlined />;
      default:
        return <BookOutlined />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "default";
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter = filter === "all" || project.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Statistics Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card className="hover:shadow-md transition-all duration-300">
            <Statistic
              title="Total Projects"
              value={totalProjects}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="hover:shadow-md transition-all duration-300">
            <Statistic
              title="Completed Projects"
              value={completedProjects}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="hover:shadow-md transition-all duration-300">
            <Statistic
              title="In Progress"
              value={inProgressProjects}
              prefix={<SyncOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="hover:shadow-md transition-all duration-300">
            <Statistic
              title="Task Completion"
              value={Math.round((completedTasks / totalTasks) * 100) || 0}
              suffix="%"
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
          <p className="text-gray-500">Manage and track your educational projects</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Search
            placeholder="Search projects..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:w-64"
          />
          <Select
            value={filter}
            onChange={setFilter}
            size="large"
            className="w-full md:w-40"
            suffixIcon={<FilterOutlined />}
          >
            <Option value="all">All Projects</Option>
            <Option value="completed">Completed</Option>
            <Option value="in-progress">In Progress</Option>
            <Option value="planned">Planned</Option>
          </Select>
          <Radio.Group 
            value={viewMode} 
            onChange={(e) => setViewMode(e.target.value)}
            size="large"
            className="flex items-center"
          >
            <Radio.Button value="grid">
              <ProjectOutlined />
            </Radio.Button>
            <Radio.Button value="timeline">
              <CalendarOutlined />
            </Radio.Button>
          </Radio.Group>
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            New Project
          </Button>
        </div>
      </div>

      <Divider />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className="h-full hover:shadow-lg transition-all duration-300 border-0"
              style={{ background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)' }}
              actions={[
                <Tooltip title="Project Members">
                  <Space>
                    <Avatar.Group maxCount={3}>
                      {[...Array(project.members)].map((_, i) => (
                        <Avatar key={i} style={{ backgroundColor: '#87d068' }}>U{i + 1}</Avatar>
                      ))}
                    </Avatar.Group>
                  </Space>
                </Tooltip>,
                <Tooltip title="Deadline">
                  <Space>
                    <ClockOutlined />
                    <span className="text-sm">{new Date(project.deadline).toLocaleDateString()}</span>
                  </Space>
                </Tooltip>,
                <Button type="link" className="text-blue-500 hover:text-blue-600">
                  View Details
                </Button>,
              ]}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {getCategoryIcon(project.category)}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                  </div>
                  <Badge
                    status={getStatusColor(project.status)}
                    text={
                      <span className="text-sm font-medium">
                        {project.status.replace("-", " ")}
                      </span>
                    }
                  />
                </div>
                <p className="text-gray-600 text-sm">{project.description}</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                  <Progress
                    percent={project.progress}
                    status={project.status === "completed" ? "success" : "active"}
                    strokeColor={project.status === "completed" ? "#52c41a" : "#1890ff"}
                    showInfo={false}
                    className="mb-2"
                  />
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <Space>
                      <Tag color={getPriorityColor(project.priority)}>
                        {project.priority} priority
                      </Tag>
                      <span>Last updated: {new Date(project.lastUpdated).toLocaleDateString()}</span>
                    </Space>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Tasks: {project.completedTasks}/{project.tasks}</span>
                    <span>Members: {project.members}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 