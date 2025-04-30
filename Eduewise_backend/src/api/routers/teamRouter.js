import express from "express";
import TeamCtrl from "../controllers/TeamCtrl.js";

const router = express.Router();

router.post("/register", TeamCtrl.registerTeam);
router.get("/details", TeamCtrl.getTeamDetails);

export default router; 