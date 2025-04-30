import ProjectRepository from "../database/repository/project-repository.js";

class ProjectService {
  constructor() {
    this.repository = new ProjectRepository();
  }
  async registerProjects(inputs) {
    const {
      projectTitle,
      researchArea,
      groupMembers,
      supervisor,
      coSupervisor,
      userId,
    } = inputs;

    try {
      const existingMember = await this.repository.getProject({ groupMembers });
      if (existingMember.success) {
        return {
          success: false,
          message: "Members are already registered.",
          data: null,
        };
      }
      const createProject = await this.repository.registerProjects({
        projectTitle,
        researchArea,
        groupMembers,
        supervisor,
        coSupervisor,
        userId,
        isActive: true,
      });
      if (!createProject.success) {
        return {
          success: false,
          message: createProject.message,
          data: null,
        };
      }

      return {
        success: true,
        message: "Project registered successfully.",
        data: createProject.data,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async viewProject(projectId) {
    try {
      return await this.repository.viewProject(projectId); // Pass projectId directly
    } catch (error) {
      console.log(error);
      return { 
        success: false,
        message: error.message,
        data: error.stack };
    }
  }
}

export default ProjectService;
