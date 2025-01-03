import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Grade = sequelize.define("Grade", {
    GradeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Value: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 1,
            max: 10,
        },
    },
    ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    JuryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Grade;
