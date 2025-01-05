import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

import userModel from "./user.js";
import studentModel from "./student.js";
import professorModel from "./professor.js";
import teamModel from "./team.js";
import projectModel from "./project.js";
import deliverableModel from "./deliverable.js";
import juryModel from "./jury.js";
import gradeModel from "./grade.js";
import notificationModel from "./notification.js";

// Initialize models
const User = userModel(sequelize, DataTypes);
const Student = studentModel(sequelize, DataTypes);
const Professor = professorModel(sequelize, DataTypes);
const Team = teamModel(sequelize, DataTypes);
const Project = projectModel(sequelize, DataTypes);
const Deliverable = deliverableModel(sequelize, DataTypes);
const Jury = juryModel(sequelize, DataTypes);
const Grade = gradeModel(sequelize, DataTypes);
const Notification = notificationModel(sequelize, DataTypes);

// Define Associations
User.hasMany(Student, { foreignKey: "UserId" });
Student.belongsTo(User, { foreignKey: "UserId" });

User.hasMany(Professor, { foreignKey: "UserId" });
Professor.belongsTo(User, { foreignKey: "UserId" });

Notification.belongsTo(User, { foreignKey: "UserId" });
Jury.belongsTo(User, { foreignKey: "UserId" });

Team.hasMany(Student, { foreignKey: "TeamId" });
Student.belongsTo(Team, { foreignKey: "TeamId" });

Project.belongsTo(Team, { foreignKey: "TeamId" });
Team.hasOne(Project, { foreignKey: "TeamId" });

Project.hasMany(Deliverable, { foreignKey: "ProjectId" });
Deliverable.belongsTo(Project, { foreignKey: "ProjectId" });

Project.hasMany(Jury, { foreignKey: "ProjectId" });
Jury.belongsTo(Project, { foreignKey: "ProjectId" });

Grade.belongsTo(Jury, { foreignKey: "JuryId" });
Grade.belongsTo(Project, { foreignKey: "ProjectId" });

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
