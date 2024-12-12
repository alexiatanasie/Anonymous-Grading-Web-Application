const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
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
module.exports = Project;