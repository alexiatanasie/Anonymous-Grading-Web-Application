export default (sequelize, DataTypes) => {
    const Professor = sequelize.define("Professor", {
        ProfessorId: {
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
    });
    return Professor;
};
