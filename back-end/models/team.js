import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Team=sequelize.define(
    "Team",{
        TeamId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        TeamName:{
            type: DataTypes.STRING(30),
            allowNull: true,
            defaultValue: "No Team",
        },
        ProjectID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
    },
    { timestamps: false }
);
export default Team;
