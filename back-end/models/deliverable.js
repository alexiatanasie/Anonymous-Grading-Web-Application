export default (sequelize, DataTypes) => {
    const Deliverable = sequelize.define("Deliverable", {
        DeliverableId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ProjectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Projects',
                key: 'ProjectId'
            }
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
    return Deliverable;
};
