export default (sequelize, DataTypes) => {
    const Notification = sequelize.define("Notification", {
        NotificationId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        Message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        IsRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });
    return Notification;
};
