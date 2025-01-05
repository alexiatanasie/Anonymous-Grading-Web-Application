import sequelize from "../config/database.js";
import { Sequelize, DataTypes } from 'sequelize';


import userModel from "./user.js";
import studentModel from "./student.js";
import professorModel from "./professor.js";
import teamModel from "./team.js";
import projectModel from "./project.js";
import juryModel from "./jury.js";
import gradeModel from "./grade.js";

// Initialize models
const User = userModel(sequelize, DataTypes);
const Student = studentModel(sequelize, DataTypes);
const Professor = professorModel(sequelize, DataTypes);
const Team = teamModel(sequelize, DataTypes);
const Project = projectModel(sequelize, DataTypes);
const Jury = juryModel(sequelize, DataTypes);
const Grade = gradeModel(sequelize, DataTypes);

// Define Associations
User.hasMany(Student, { foreignKey: "UserId" });
Student.belongsTo(User, { foreignKey: "UserId" });

User.hasMany(Professor, { foreignKey: "UserId" });
Professor.belongsTo(User, { foreignKey: "UserId" });

Jury.belongsTo(User, { foreignKey: "UserId" });
Jury.belongsTo(Project, { foreignKey: "ProjectId" });

Team.hasMany(Student, { foreignKey: "TeamId" });
Student.belongsTo(Team, { foreignKey: "TeamId" });

Project.belongsTo(Team, { foreignKey: "TeamId" });
Team.hasOne(Project, { foreignKey: "TeamId" });

Project.hasMany(Jury, { foreignKey: "ProjectId" });
Jury.belongsTo(Project, { foreignKey: "ProjectId" });

Grade.belongsTo(Jury, { foreignKey: "JuryId" });
Grade.belongsTo(Project, { foreignKey: "ProjectId" });

export {
    sequelize,
    Sequelize,
    User,
    Student,
    Professor,
    Team,
    Project,
    Jury,
    Grade,
    
};
