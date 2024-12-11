module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("course", {
    department: {
      type: Sequelize.STRING,
    },
    courseNumber: {
      type: Sequelize.STRING,
    },
    level: {
      type: Sequelize.STRING,
    },
    hours: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING(1401),
    },
  },{ timestamps: false });
  return Course;
};
