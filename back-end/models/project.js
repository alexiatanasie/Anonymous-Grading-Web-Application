export default (sequelize, DataTypes) => {
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
        TeamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Teams',
                key: 'id'
            }
        },
    });
    return Project;
};
