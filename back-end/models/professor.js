import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Professor = sequelize.define(
  "Professor",
  {
    ProfessorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProfessorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { timestamps: false }
);

export default Professor;
