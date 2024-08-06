import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

interface companyApplicationTokenAttributes {
    id: number;
    application_id: number;
    company_id: number;
    access_token: string;
    refresh_token: string;
    created_by_user: number;
    created_at: Date;
    is_active: boolean;
}

interface companyApplicationTokenCreationAttributes extends Partial<companyApplicationTokenAttributes>{}

class companyApplicationTokenModel extends Model<companyApplicationTokenAttributes, companyApplicationTokenCreationAttributes> implements companyApplicationTokenAttributes {
    public id!: number;
    public application_id!: number;
    public company_id!: number;
    public access_token!: string;
    public refresh_token!: string;
    public created_by_user!: number;
    public created_at!: Date;
    public is_active!: boolean;
}

companyApplicationTokenModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    application_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'applicationModel',
            key: 'application_id',
        }
    },
    company_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'companyModel',
            key: 'company_id',
        }
    },
    access_token: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
    },
    refresh_token: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
    },
    created_by_user: {
        type: DataTypes.INTEGER,
        references: {
            model: 'userModel',
            key: 'user_id',
        }
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},{
    sequelize,
    tableName: 'company_application_token',
    timestamps: false,
});

export default companyApplicationTokenModel;