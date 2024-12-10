const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User=sequelize.define(
    "User",{
        UserId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        Username:{
            type:DataTypes.STRING(30),
            allowNull:false,
    },
        Name:{ 
            type:DataTypes.STRING(70),
            allowNull:false,


        },
        Password:{
            type:DataTypes.STRING(13),
            allowNull:false,

        },
        Email:{
            type:DataTypes.STRING(30),
            allowNull:false,
        },

        UserType:{
            type: DataTypes.ENUM("professor", "student"),
            allowNull: false,
        },
    },
    { timestamps: false }
);
module.exports = User;
