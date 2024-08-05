import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

interface Rate_Limit_Attributes{
    rate_limit_id: number;
    user_id: number;
    max_request: number;
    time_window: Date;
}

interface Rate_Limit_Creation_Attributes extends Partial<Rate_Limit_Attributes>{}

class Rate_Limit extends Model<Rate_Limit_Attributes, Rate_Limit_Creation_Attributes> implements Rate_Limit_Attributes{
    public rate_limit_id!: number;
    public user_id!: number;
    public max_request!: number;
    public time_window!: Date;
}

Rate_Limit.init({
    rate_limit_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'user_id',
          },
    },
    max_request: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    time_window: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},{
    sequelize,
    tableName: 'Rate_Limit',
    timestamps: false,
});

export default Rate_Limit;