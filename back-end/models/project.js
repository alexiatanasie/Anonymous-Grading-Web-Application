import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Project = sequelize.define("Project", {
    ProjectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    TeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Project;
