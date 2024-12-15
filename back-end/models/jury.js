import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Jury = sequelize.define("Jury", {
    JuryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Jury;
