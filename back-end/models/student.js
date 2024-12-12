import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const Student=sequelize.define(
    "Student",{
        StudentId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UserId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        TeamId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        JuryId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    { timestamps: false}
);

export default Student;
