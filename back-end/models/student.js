const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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

module.exports = Student;