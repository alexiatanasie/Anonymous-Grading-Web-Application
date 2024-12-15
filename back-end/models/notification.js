export default (sequelize, Sequelize) => {
    return sequelize.define("Notification", {
        NotificationId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Message: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        IsRead: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
};
