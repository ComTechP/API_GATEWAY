import { DataTypes, Model, Sequelize } from "sequelize";


interface rateLimitAttributes{
    rate_limit_id: number;
    user_id: number;
    max_request: number;
    time_window: Date;
}

interface rateLimitCreationAttributes extends Partial<rateLimitAttributes>{}

export class rateLimitModel extends Model<rateLimitAttributes, rateLimitCreationAttributes> implements rateLimitAttributes{
    public rate_limit_id!: number;
    public user_id!: number;
    public max_request!: number;
    public time_window!: Date;
}

export const initRateLimitModel = (sequelize: Sequelize) => {
    rateLimitModel.init({
    rate_limit_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
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
        tableName: 'rate_limit',
        timestamps: false,
    }
  );
};

export type rateLimitInstance = typeof rateLimitModel & {
    new (): rateLimitModel;
};

