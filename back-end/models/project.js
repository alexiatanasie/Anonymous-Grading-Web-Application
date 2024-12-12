import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Project=sequelize.define(
    "Project",{
        ProjectId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Title:{
            type:DataTypes.STRING(30),
            allowNull:false,
        },
        TeamId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
    },
    { timestamps: false }
);
export default Project;
