import Projects from "../models/Projects.js";
import { v4 as uuidv4 } from "uuid";

class ProjectRepository {
  async getProject(filters) {
    try {
      const existingMember = await Projects.findOne(filters).lean();

      return {
        success: !!existingMember,
        message: existingMember ? "project fetched!" : "project not found.",
        data: existingMember || null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async registerProjects(inputs) {
    try {
      const newProject = new Projects(inputs);
      const createdProject = await newProject.save();

      return {
        success: true,
        message: "Project registered successfully.",
        data: createdProject,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async viewProject(projectId) {
    try {
      const project = await Projects.findOne({ _id: projectId }).lean(); // Correct query format

      if (!project) {
        return {
          success: false,
          message: "Project not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Project fetched successfully",
        data: project,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }
}

export default ProjectRepository;
