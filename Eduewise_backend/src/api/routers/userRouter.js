import express from "express";
const router = express.Router();
import auth from "../Middleware/auth.js";
import UserCtrl from "../controllers/UserCtrl.js";

router.get("/protected-route", auth, (req, res) => {
  res.json({
    success: true,
    message: "Access granted!",
    user: req.user,
  });
});

router.post("/register", UserCtrl.registerUser);
router.post("/register-team", UserCtrl.registerTeam);
router.post("/signin", UserCtrl.signIn);
router.post("/signout", auth, UserCtrl.signOut);
router.get("/view", auth, UserCtrl.viewUser);
router.post("/add", auth, UserCtrl.addNewUser);
router.get("/team-details", UserCtrl.getTeamDetails);
// router.post("/remove-user",auth,UserCtrl.removeUse);

export default router;
