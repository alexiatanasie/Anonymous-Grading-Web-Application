import { Sequelize } from 'sequelize'

import userCreator from './models/user.js'
import studentCreator from './models/student.js'
import professorCreator from './models/professor.js'
import juryCreator from './models/jury.js'
import gradeCreator from './models/grade.js'
import teamCreator from './models/team.js'
import projectCreator from './models/project.js'
import notificationCreator from './models/notification.js'
import deliverableCreator from './models/deliverable.js'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db'
})
const User=userCreator(sequelize,Sequelize)
const Student=studentCreator(sequelize,Sequelize)
const Professor=professorCreator(sequelize,Sequelize)
const Jury=juryCreator(sequelize,Sequelize)
const Grade=gradeCreator(sequelize,Sequelize)
const Team=teamCreator(sequelize,Sequelize)
const Project=projectCreator(sequelize,Sequelize)
const Notification=notificationCreator(sequelize,Sequelize)
const Deliverable=deliverableCreator(sequelize,Sequelize)

//associations TREBUIE CORECTATE!!!!!!! 
User.hasMany(Student, { foreignKey: "UserId" });
User.hasMany(Notification, { foreignKey: "UserId" });
Student.belongsTo(User, { foreignKey: "UserId" });

Project.hasMany(Deliverable, { foreignKey: "ProjectId" });
Deliverable.belongsTo(Project, { foreignKey: "ProjectId" });

Team.hasMany(Student, { foreignKey: "TeamId" });
Student.belongsTo(Team, { foreignKey: "TeamId" });

Project.belongsTo(Team, { foreignKey: "TeamId" });
Team.hasOne(Project, { foreignKey: "TeamId" });

Jury.belongsTo(User, { foreignKey: "UserId" });
Jury.belongsTo(Project, { foreignKey: "ProjectId" });
Grade.belongsTo(Jury, { foreignKey: "JuryId" });
Grade.belongsTo(Project, { foreignKey: "ProjectId" });

Project.hasMany(Jury, { foreignKey: "ProjectId" });

(async () => {
    try {
      await sequelize.sync({ alter: true });
      console.log("Database synchronized!");
    } catch (error) {
      console.error("Error syncing database:", error);
    }
  })();

export default{
    User,
    Student,
    Professor,
    Jury,
    Grade,
    Team,
    Project,
    Notification,
    Deliverable
};