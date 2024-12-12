import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Notification=sequelize.define(
    "Notification",{
        NotificationId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        IsRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        
    },
    { timestamps: false }

);
export default Notification;
