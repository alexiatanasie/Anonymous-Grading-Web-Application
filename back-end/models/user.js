export default (sequelize, Sequelize) => {
    return sequelize.define("User", {
        UserId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        UserType: {
            type: Sequelize.STRING, 
            allowNull: false,
        },
    });
};
