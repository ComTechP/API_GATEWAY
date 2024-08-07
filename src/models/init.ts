import sequelize from "./connection";
import apiRequestModel from "./DBModels/APIRequestModel";
import applicationModel from "./DBModels/ApplicationModel";
import cacheModel from "./DBModels/CacheModel";
import companyModel from "./DBModels/CompanyModel";
import companyApplicationTokenModel from "./DBModels/CompanyApplicationTokenModel";
import logModel from "./DBModels/LogModel";
import rateLimitModel from "./DBModels/RateLimitModel";
import serviceModel from "./DBModels/ServiceModel";
import sessionTokenModel from "./DBModels/SessionTokenModel";
import userGroupModel from "./DBModels/UserGroupModel";
import userModel from "./DBModels/UserModel";
import './Associations';

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => {
    console.error('Error creating database:', error);
  });

export default sequelize;