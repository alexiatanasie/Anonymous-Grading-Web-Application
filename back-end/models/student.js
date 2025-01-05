export default (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        StudentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'UserId'
            },
        },
        teamId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'Students',
        timestamps: true,
    });
    return Student;
};
