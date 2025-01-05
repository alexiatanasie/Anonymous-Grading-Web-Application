export default (sequelize, DataTypes) => {
    const Jury = sequelize.define("Jury", {
        JuryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "UserId",
            },
            unique: "juryUniqueConstraint", 
        },
        ProjectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Projects",
                key: "ProjectId",
            },
            unique: "juryUniqueConstraint", 
        },
    });
    return Jury;
};
