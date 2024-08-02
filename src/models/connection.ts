import { Sequelize } from 'sequelize';
import dotenv = require('dotenv');

dotenv.config({ path: '../../.env' });

const sequelize = new Sequelize('gateway_db', 'root', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize;

declare global {
  var sequelize: Sequelize;
}

global.sequelize = sequelize;
