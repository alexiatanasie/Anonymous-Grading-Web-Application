const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Deliverable = sequelize.define(
  "Deliverable",
  {
    DeliverableId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    VideoLink: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Deliverable;
