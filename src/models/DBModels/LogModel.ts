import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

interface logAttributes{
    log_id: number;
    request_id: number;
    log_message: string;
    log_level: number;
    time: Date;
}

interface logCreationAttributes extends Partial<logAttributes>{}

class logModel extends Model<logAttributes, logCreationAttributes> implements logAttributes{
    public log_id!: number;
    public request_id!: number;
    public log_message!: string;
    public log_level!: number;
    public time!: Date;
}

logModel.init({
    log_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    request_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'apiResquestModel',
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
    tableName:'log',
    timestamps: false,
});

export default logModel;