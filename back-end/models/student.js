export default (sequelize, Sequelize) => {
    return sequelize.define("Student", {
        StudentId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        TeamId: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
    });
};
