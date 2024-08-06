import applicationModel from "./DBModels/ApplicationModel";
import companyModel from "./DBModels/CompanyModel";
import companyApplicationTokenModel from "./DBModels/CompanyApplicationTokenModel";
import sessionTokenModel from "./DBModels/SessionTokenModel";
import userModel from "./DBModels/UserModel";
import rateLimitModel from "./DBModels/RateLimitModel";
import serviceModel from "./DBModels/ServiceModel";
import logModel from "./DBModels/LogModel";
import apiRequestModel from "./DBModels/APIRequestModel";
import userGroupModel from "./DBModels/UserGroupModel";

//Application Model Associations
applicationModel.hasMany(companyApplicationTokenModel, { foreignKey: "application_id" });
companyApplicationTokenModel.belongsTo(applicationModel, { foreignKey: "application_id" });

//Company Model Associations
companyModel.hasMany(companyApplicationTokenModel, { foreignKey: "company_id" });
companyApplicationTokenModel.belongsTo(companyModel, { foreignKey: "company_id" });

companyModel.hasMany(userModel, { foreignKey: "company_id" });
userModel.belongsTo(companyModel, { foreignKey: "company_id" });

companyModel.hasMany(userGroupModel, { foreignKey: "company_id" });
userGroupModel.belongsTo(companyModel, { foreignKey: "company_id" });

//User Model Associations
userModel.hasMany(rateLimitModel, { foreignKey: "user_id" });
rateLimitModel.belongsTo(userModel, { foreignKey: "user_id" });

userModel.hasMany(sessionTokenModel, { foreignKey: "user_id" });
sessionTokenModel.belongsTo(userModel, { foreignKey: "user_id" });

userModel.hasMany(apiRequestModel, { foreignKey: "user_id" });
apiRequestModel.belongsTo(userModel, { foreignKey: "user_id" });

userModel.hasMany(companyApplicationTokenModel, { foreignKey: "created_by_user_id" });
companyApplicationTokenModel.belongsTo(userModel, { foreignKey: "created_by_user_id" });

//Service Model Associations
serviceModel.hasMany(apiRequestModel, { foreignKey: "service_id" });
apiRequestModel.belongsTo(serviceModel, { foreignKey: "service_id" });

//API_Request Model Associations
apiRequestModel.hasMany(logModel, { foreignKey: "request_id" });
logModel.belongsTo(apiRequestModel, { foreignKey: "request_id" });

//User_Group Associations
userGroupModel.hasMany(userModel, { foreignKey: "group_id" });
userModel.belongsTo(userGroupModel, { foreignKey: "group_id" });
