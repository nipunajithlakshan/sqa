import Team from "../database/models/Team.js";

class TeamService {
  async registerTeam({ teamMembers, moduleName }) {
    try {
      console.log("Registering team with data:", { teamMembers, moduleName });
      
      const team = new Team({
        moduleName,
        teamMembers,
      });

      console.log("Team object before save:", team);
      
      const savedTeam = await team.save();
      console.log("Team saved successfully:", savedTeam);

      return {
        success: true,
        message: "Team registered successfully",
        data: savedTeam,
      };
    } catch (error) {
      console.error("Team registration error:", error);
      return {
        success: false,
        message: error.message || "Failed to register team",
        data: null,
      };
    }
  }

  async getTeamDetails() {
    try {
      console.log("Fetching team details...");
      const team = await Team.findOne({ isActive: true })
        .sort({ createdAt: -1 });

      console.log("Found team:", team);

      if (!team) {
        return {
          success: false,
          message: "No team found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Team details retrieved successfully",
        data: team,
      };
    } catch (error) {
      console.error("Error fetching team details:", error);
      return {
        success: false,
        message: error.message || "Failed to fetch team details",
        data: null,
      };
    }
  }
}

export default TeamService; 