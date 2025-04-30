import express from "express";
const router = express.Router();
import auth from "../Middleware/auth.js";
import ProjectCtrl from "../controllers/ProjectCtrl.js";

router.post("/register-project", auth, ProjectCtrl.registerPrejects);
router.get("/view-project",auth,ProjectCtrl.viewProject);

export default router;
