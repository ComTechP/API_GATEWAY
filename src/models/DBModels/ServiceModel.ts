import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

interface ServiceAttributes{
    service_id: number;
    service_name: string;
    service_url: string;
}

interface ServiceCreationAttributes extends Partial<ServiceAttributes>{}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes{
    public service_id!: number;
    public service_name!: string;
    public service_url!: string;
}

Service.init({
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
    tableName: 'Service',
    timestamps: false,
});

export default Service;