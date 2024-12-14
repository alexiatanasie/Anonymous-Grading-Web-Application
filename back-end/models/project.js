export default (sequelize, Sequelize) => {
    return sequelize.define("Project", {
        ProjectId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        TeamId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        TotalGrade: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
    });
};
