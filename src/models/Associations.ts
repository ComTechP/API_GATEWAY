import db from './connection';

const { user, user_gorup, api_request, application, cache, company, company_application_token, log, rate_limit, service, session_token } = db;


//Application Model Associations
application.hasOne(company_application_token, { foreignKey: "application_id" });
company_application_token.belongsTo(application, { foreignKey: "application_id" });

//Company Model Associations
company.hasOne(company_application_token, { foreignKey: "company_id" });
company_application_token.belongsTo(company, { foreignKey: "company_id" });

company.hasOne(user, { foreignKey: "company_id" });
user.belongsTo(company, { foreignKey: "company_id" });

company.hasOne(user_gorup, { foreignKey: "company_id" });
user_gorup.belongsTo(company, { foreignKey: "company_id" });

//User Model Associations
user.hasOne(rate_limit, { foreignKey: "user_id" });
rate_limit.belongsTo(user, { foreignKey: "user_id" });

user.hasOne(session_token, { foreignKey: "user_id" });
session_token.belongsTo(user, { foreignKey: "user_id" });

user.hasOne(api_request, { foreignKey: "user_id" });
api_request.belongsTo(user, { foreignKey: "user_id" });

user.hasOne(company_application_token, { foreignKey: "created_by_user_id" });
company_application_token.belongsTo(user, { foreignKey: "created_by_user_id" });

//Service Model Associations
service.hasOne(api_request, { foreignKey: "service_id" });
api_request.belongsTo(service, { foreignKey: "service_id" });

//API_Request Model Associations
api_request.hasOne(log, { foreignKey: "request_id" });
log.belongsTo(api_request, { foreignKey: "request_id" });

//User_Group Associations
user_gorup.hasOne(user, { foreignKey: "group_id" });
user.belongsTo(user_gorup, { foreignKey: "group_id" });

