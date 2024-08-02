import { DataTypes, Model } from "sequelize";
import sequelize from "../index";

interface LogAttributes{
    log_id: number;
    request_id: number;
    log_message: string;
    log_level: number;
    time: Date;
}

interface LogCreationAttributes extends Partial<LogAttributes>{}

class Log extends Model<LogAttributes, LogCreationAttributes> implements LogAttributes{
    public log_id!: number;
    public request_id!: number;
    public log_message!: string;
    public log_level!: number;
    public time!: Date;
}

Log.init({
    log_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    request_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'API_request',
            key: 'request_id',
        }
    },
    log_message: {
        type: DataTypes.STRING(255),
    },
    log_level: {
        type: DataTypes.INTEGER,
    },
    time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},{
    sequelize,
    tableName:'Log',
    timestamps: false,
});

export default Log;