import { Sequelize } from "sequelize";
import userCreator from "./user.js";
import studentCreator from "./student.js";
import professorCreator from "./professor.js";
import juryCreator from "./jury.js";
import gradeCreator from "./grade.js";
import teamCreator from "./team.js";
import projectCreator from "./project.js";
import notificationCreator from "./notification.js";
import deliverableCreator from "./deliverable.js";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.db",
});


const User = userCreator(sequelize, Sequelize);
const Student = studentCreator(sequelize, Sequelize);
const Professor = professorCreator(sequelize, Sequelize);
const Jury = juryCreator(sequelize, Sequelize);
const Grade = gradeCreator(sequelize, Sequelize);
const Team = teamCreator(sequelize, Sequelize);
const Project = projectCreator(sequelize, Sequelize);
const Notification = notificationCreator(sequelize, Sequelize);
const Deliverable = deliverableCreator(sequelize, Sequelize);

User.hasMany(Student, { foreignKey: "UserId" });
User.hasMany(Notification, { foreignKey: "UserId" });
Student.belongsTo(User, { foreignKey: "UserId" });

Team.hasMany(Student, { foreignKey: "TeamId" });
Student.belongsTo(Team, { foreignKey: "TeamId" });

Project.belongsTo(Team, { foreignKey: "TeamId" });
Team.hasOne(Project, { foreignKey: "TeamId" });

Project.hasMany(Deliverable, { foreignKey: "ProjectId" });
Deliverable.belongsTo(Project, { foreignKey: "ProjectId" });

Project.hasMany(Jury, { foreignKey: "ProjectId" });
Jury.belongsTo(Project, { foreignKey: "ProjectId" });

Jury.belongsTo(User, { foreignKey: "UserId" });

Grade.belongsTo(Jury, { foreignKey: "JuryId" });
Grade.belongsTo(Project, { foreignKey: "ProjectId" });

(async () => {
    try {
        await sequelize.sync({ alter: true }); 
        console.log("Database synchronized!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
})();

export default {
    User,
    Student,
    Professor,
    Jury,
    Grade,
    Team,
    Project,
    Notification,
    Deliverable,
};
