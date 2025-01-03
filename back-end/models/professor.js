import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Professor = sequelize.define("Professor", {
    ProfessorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Professor;
