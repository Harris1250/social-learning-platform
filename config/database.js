const { Sequelize } = require('sequelize');

// Create a Sequelize instance with database details
const sequelize = new Sequelize('social_learning_platform', 'mnadeem2', 'Undergradstudent2002', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false, // Disable logging SQL queries in the console
});

module.exports = sequelize;
