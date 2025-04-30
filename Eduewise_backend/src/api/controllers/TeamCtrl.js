import TeamService from "../../services/team-service.js";

const teamService = new TeamService();

const TeamCtrl = {
  registerTeam: async (req, res, next) => {
    const { teamMembers, moduleName } = req.body;

    try {
      const response = await teamService.registerTeam({
        teamMembers,
        moduleName,
      });

      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },

  getTeamDetails: async (req, res, next) => {
    try {
      const response = await teamService.getTeamDetails();
      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default TeamCtrl; 