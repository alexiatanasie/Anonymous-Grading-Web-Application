import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Team = sequelize.define('Team', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'teams',
    timestamps: true,
});

export default Team;
