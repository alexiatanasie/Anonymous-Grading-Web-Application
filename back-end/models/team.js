export default (sequelize, DataTypes) => {
    const Team = sequelize.define(
        "Team",
        {
            TeamId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            TeamName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ProfessorId: {
                type: DataTypes.INTEGER,
                allowNull: true, 
                references: {
                    model: "Professors",
                    key: "ProfessorId",
                },
            },
        },
        {
            tableName: "teams",
            timestamps: true,
        }
    );

    Team.associate = (models) => {
        Team.belongsTo(models.Professor, {
            foreignKey: "ProfessorId",
            as: "Professor",
            onDelete: "SET NULL",
        });

        Team.hasMany(models.Student, {
            foreignKey: "TeamId",
            as: "Students",
            onDelete: "SET NULL",
        });
    };

    return Team;
};
