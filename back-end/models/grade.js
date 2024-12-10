const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");

const Grade=sequelize.define(
    "Grade",
    {
        GradeId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        Grade:{ 
            type: DataTypes.REAL,
            allowNull: false,
            validate: {
                min: 1, 
                max: 10, 
            },
        },
        JuryId:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        ProjectId:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
    },
    { timestamps: false }

);
module.exports = Grade;