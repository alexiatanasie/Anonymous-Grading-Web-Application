import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Deliverable = sequelize.define("Deliverable", {
    DeliverableId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

export default Deliverable;
