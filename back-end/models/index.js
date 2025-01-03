import sequelize from "../config/database.js";
import User from "./user.js";
import Student from "./student.js";
import Professor from "./professor.js";
import Team from "./team.js";
import Project from "./project.js";
import Deliverable from "./deliverable.js";
import Jury from "./jury.js";
import Grade from "./grade.js";
import Notification from "./notification.js";


User.hasMany(Student, { foreignKey: "UserId" });
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

Notification.belongsTo(User, { foreignKey: "UserId" });

export {
    sequelize,
    User,
    Student,
    Professor,
    Team,
    Project,
    Deliverable,
    Jury,
    Grade,
    Notification,
};
