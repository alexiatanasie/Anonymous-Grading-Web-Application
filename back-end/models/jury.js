export default (sequelize, Sequelize) => {
    return sequelize.define("Jury", {
        JuryId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    });
};
