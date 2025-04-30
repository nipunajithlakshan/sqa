import { Schema, model } from "mongoose";

const teamSchema = new Schema(
  {
    moduleName: {
      type: String,
      required: true,
    },
    teamMembers: [{
      name: {
        type: String,
        required: true,
      },
      studentId: {
        type: String,
        required: true,
      }
    }],
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Team = model("Team", teamSchema);

export default Team; 