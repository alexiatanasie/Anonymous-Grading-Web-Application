export default (sequelize, Sequelize) => {
  return sequelize.define("Deliverable", {
      DeliverableId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      Title: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      Description: {
          type: Sequelize.STRING,
          allowNull: true,
      },
      Link: {
          type: Sequelize.STRING,
          allowNull: true,
      },
  });
};
