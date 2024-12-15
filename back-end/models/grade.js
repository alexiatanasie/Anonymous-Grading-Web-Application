export default (sequelize, Sequelize) => {
    return sequelize.define("Grade", {
        GradeId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Value: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {
                min: 1,
                max: 10,
            },
        },
    });
};
