import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { apiRequestModel, initApiRequestModel, apiRequestInstance} from './DBModels/APIRequestModel';
import { applicationModel, initApplicationModel, applicationInstance } from './DBModels/ApplicationModel';
import { cacheModel, initCacheModel, cacheInstance } from './DBModels/CacheModel';
import { companyApplicationTokenModel, initCompanyApplicationTokenModel, companyApplicationTokenInstance } from './DBModels/CompanyApplicationTokenModel';
import { companyModel, initCompanyModel, companyInstance } from './DBModels/CompanyModel';
import { logModel, initLogModel, logInstance } from './DBModels/LogModel';
import { rateLimitModel, initRateLimitModel, rateLimitInstance } from './DBModels/RateLimitModel';
import { serviceModel, initServiceModel, serviceInstance } from './DBModels/ServiceModel';
import { sessionTokenModel, initSessionTokenModel, sessionTokenInstance } from './DBModels/SessionTokenModel';
import { userGroupModel, initUserGroupModel, userGroupInstance } from './DBModels/UserGroupModel';
import { userModel, initUserModel,userInstance } from './DBModels/UserModel';


const configPath = path.resolve(__dirname, '../../config/config.json');
const rawConfig = fs.readFileSync(configPath, 'utf-8');
const config = JSON.parse(rawConfig);


const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    sequelize.sync({ alter: true });
    console.log('db connection established');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

connect();

interface Database {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  cache: cacheInstance;
  application: applicationInstance;
  company: companyInstance;
  service: serviceInstance;
  user_gorup: userGroupInstance;
  user: userInstance;
  session_token: sessionTokenInstance;
  rate_limit: rateLimitInstance;
  api_request: apiRequestInstance;
  log: logInstance;
  company_application_token: companyApplicationTokenInstance;
}

const db: Database = {
  Sequelize,
  sequelize,
  cache: cacheModel,
  application: applicationModel,
  company: companyModel,
  service: serviceModel,
  user_gorup: userGroupModel,
  user: userModel,
  session_token: sessionTokenModel,
  rate_limit: rateLimitModel,
  api_request: apiRequestModel,
  log: logModel,
  company_application_token: companyApplicationTokenModel,
};

initCacheModel(sequelize);
initApplicationModel(sequelize);
initCompanyModel(sequelize);
initServiceModel(sequelize);
initUserGroupModel(sequelize);
initUserModel(sequelize);
initSessionTokenModel(sequelize);
initRateLimitModel(sequelize);
initApiRequestModel(sequelize);
initLogModel(sequelize);
initCompanyApplicationTokenModel(sequelize);


sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => {
    console.error('Error creating database:', error);
  });


export default db;
