export default (sequelize, Sequelize) => {
  return sequelize.define("Professor", {
      ProfessorId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
  });
};
