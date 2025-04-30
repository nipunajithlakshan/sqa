import { model, Model, Schema, Types } from "mongoose";

const projectSchema = new Schema(
  {
    projectTitle: {
      type: String,
    },

    researchArea: {
      type: String,
    },

    groupMembers: {
      type: String,
    },

    supervisor: {
      type: String,
    },
    coSupervisor: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Project = model("Project", projectSchema);

export default Project;
