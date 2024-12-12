import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Jury=sequelize.define(
    "Jury",{
        JuryId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        GradeId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        },
        UserId:{
            type: DataTypes.INTEGER,
        allowNull:false,
        },
        StudentId:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
    },
    { timestamps: false }

);
export default Jury;
