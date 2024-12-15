import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Student = sequelize.define("Student", {
    StudentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    TeamId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Student;
