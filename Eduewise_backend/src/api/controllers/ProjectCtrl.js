import ProjectService from "../../services/project-service.js";

const projectService = new ProjectService();
const ProjectCtrl = {
  registerPrejects: async (req, res, next) => {
    const {
      projectTitle,
      researchArea,
      groupMembers,
      supervisor,
      coSupervisor,
    } = req.body;
    const userId = req.user;

    try {
      const response = await projectService.registerProjects({
        projectTitle,
        researchArea,
        groupMembers,
        supervisor,
        coSupervisor,
        userId,
      });
      // Return the response
      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },

  viewProject: async (req, res, next) => {
    const { projectId } = req.query; // Extract projectId directly

    if (!projectId) {
      return res
        .status(400)
        .json({ success: false, message: "Project ID is required" });
    }

    try {
      const project = await projectService.viewProject(projectId); // Pass projectId directly to service
      return res.status(200).json(project); // Return the project response
    } catch (error) {
      next(error);
    }
  },
};

export default ProjectCtrl;
