import Application from "./DBModels/ApplicationModel";
import Company from "./DBModels/CompanyModel";
import Company_Application_Token from "./DBModels/CompanyApplicationTokenModel";
import Session_Token from "./DBModels/SessionTokenModel";
import User from "./DBModels/UserModel";
import Rate_Limit from "./DBModels/RateLimitModel";
import Service from "./DBModels/ServiceModel";
import Log from "./DBModels/LogModel";
import API_Request from "./DBModels/APIRequestModel";
import User_Group from "./DBModels/UserGroupModel";

//Application Model Associations
Application.hasMany(Company_Application_Token, { foreignKey: "application_id" });
Company_Application_Token.belongsTo(Application, { foreignKey: "application_id" });

//Company Model Associations
Company.hasMany(Company_Application_Token, { foreignKey: "company_id" });
Company_Application_Token.belongsTo(Company, { foreignKey: "company_id" });

Company.hasMany(User, { foreignKey: "company_id" });
User.belongsTo(Company, { foreignKey: "company_id" });

Company.hasMany(User_Group, { foreignKey: "company_id" });
User_Group.belongsTo(Company, { foreignKey: "company_id" });

//User Model Associations
User.hasMany(Rate_Limit, { foreignKey: "user_id" });
Rate_Limit.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Session_Token, { foreignKey: "user_id" });
Session_Token.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(API_Request, { foreignKey: "user_id" });
API_Request.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Company_Application_Token, { foreignKey: "created_by_user_id" });
Company_Application_Token.belongsTo(User, { foreignKey: "created_by_user_id" });

//Service Model Associations
Service.hasMany(API_Request, { foreignKey: "service_id" });
API_Request.belongsTo(Service, { foreignKey: "service_id" });

//API_Request Model Associations
API_Request.hasMany(Log, { foreignKey: "request_id" });
Log.belongsTo(API_Request, { foreignKey: "request_id" });

//User_Group Associations
User_Group.hasMany(User, { foreignKey: "group_id" });
User.belongsTo(User_Group, { foreignKey: "group_id" });
