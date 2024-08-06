import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';


const configPath = path.resolve(__dirname, '../../config/config.json');
const rawConfig = fs.readFileSync(configPath, 'utf-8');
const config = JSON.parse(rawConfig);


const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
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
