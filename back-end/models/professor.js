const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Professor = sequelize.define(
  "Professor",
  {
    ProfessorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProfessorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { timestamps: false }
);

module.exports = Professor;
