import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Team = sequelize.define("Team", {
    TeamId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    TeamName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Team;
