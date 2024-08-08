import { DataTypes, Model, Sequelize } from "sequelize";


interface serviceAttributes{
    service_id: number;
    service_name: string;
    service_url: string;
}

interface serviceCreationAttributes extends Partial<serviceAttributes>{}

export class serviceModel extends Model<serviceAttributes, serviceCreationAttributes> implements serviceAttributes{
    public service_id!: number;
    public service_name!: string;
    public service_url!: string;
}

export const initServiceModel = (sequelize: Sequelize) => {
    serviceModel.init({
    service_id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    service_name: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    service_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    },{
        sequelize,
        tableName: 'service',
        timestamps: false,
    }
  );
};

export type serviceInstance = typeof serviceModel & {
    new (): serviceModel;
};
