import express from "express";
import userRouter from "./api/routers/userRouter.js";
import projectRouter from "./api/routers/projectRouter.js";
import teamRouter from "./api/routers/teamRouter.js";
import semesterRouter from "./api/routers/semesterRouter.js";
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => res.send("Server is running!"));

//routers
app.use("/admin/user", userRouter);
app.use("/user", projectRouter);
app.use("/admin/team", teamRouter);
app.use("/admin/semester", semesterRouter);

export default app;
