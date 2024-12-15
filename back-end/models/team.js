export default (sequelize, Sequelize) => {
    return sequelize.define("Team", {
        TeamId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        TeamName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
};
