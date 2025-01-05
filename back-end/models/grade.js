export default (sequelize, DataTypes) => {
    const Grade = sequelize.define("Grade", {
        GradeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Value: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 1,
                max: 10,
            },
        },
        ProjectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Projects',
                key: 'ProjectId'
            }
        },
        JuryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Juries',
                key: 'JuryId'
            }
        },
    });
    return Grade;
};
