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
                model: 'Users', // Tabela Users
                key: 'UserId',  // Cheia primară din Users
            },
        },
        TeamId: { // Modificat din `teamId` în `TeamId` pentru consistență
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'teams', // Tabela Teams
                key: 'TeamId',  // Cheia primară din Teams
            },
        },
    }, {
        tableName: 'Students', // Explicit numele tabelei
        timestamps: true, // Include createdAt și updatedAt
    });

    // Relația între Student și Team
    Student.associate = (models) => {
        Student.belongsTo(models.Team, {
            foreignKey: 'TeamId',
            as: 'Team', // Alias opțional pentru relație
        });

        Student.belongsTo(models.User, {
            foreignKey: 'UserId',
            as: 'User', // Alias opțional pentru relație
        });
    };

    return Student;
};
