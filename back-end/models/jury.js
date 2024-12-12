const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");
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
module.exports = Jury;