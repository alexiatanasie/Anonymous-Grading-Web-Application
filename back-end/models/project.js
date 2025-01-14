import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Project = sequelize.define("Project", {
        ProjectId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        Link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        FinalGrade: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        TeamName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Project;
};