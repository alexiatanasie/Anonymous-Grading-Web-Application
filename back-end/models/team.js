const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
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
module.exports = Team;