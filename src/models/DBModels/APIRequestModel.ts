import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

interface API_Request_Attributes{
    request_id: number;
    user_id: number;
    service_id: number;
    time: Date;
    request_method: string;
    request_url: string;
    status_code: number;
}

interface API_Request_Creation_Attributes extends Partial<API_Request_Attributes>{}

class API_Request extends Model<API_Request_Attributes, API_Request_Creation_Attributes> implements API_Request_Attributes{
    public request_id!: number;
    public user_id!: number;
    public service_id!: number;
    public time!: Date;
    public request_method!: string;
    public request_url!: string;
    public status_code!: number;
}

API_Request.init({
    request_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id:{
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'user_id',
        }
    },
    service_id:{
        type: DataTypes.INTEGER,
        references: {
            model: 'Service',
            key: 'service_id',
        }
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    request_method: {
        type: DataTypes.STRING(8),
        allowNull: false,
    },
    request_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    status_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{
    sequelize,
    tableName: 'API_Request',
    timestamps: false,
});

export default API_Request;