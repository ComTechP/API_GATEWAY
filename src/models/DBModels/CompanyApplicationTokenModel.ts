import { DataTypes, Model } from "sequelize";
import sequelize from "../index";

interface Company_Application_Token_Attributes {
    id: number;
    application_id: number;
    company_id: number;
    access_token: string;
    refresh_token: string;
    created_by_user: number;
    created_at: Date;
    is_active: boolean;
}

interface Company_Application_Token_Creation_Attributes extends Partial<Company_Application_Token_Attributes>{}

class Company_Application_Token extends Model<Company_Application_Token_Attributes, Company_Application_Token_Creation_Attributes> implements Company_Application_Token_Attributes {
    public id!: number;
    public application_id!: number;
    public company_id!: number;
    public access_token!: string;
    public refresh_token!: string;
    public created_by_user!: number;
    public created_at!: Date;
    public is_active!: boolean;
}

Company_Application_Token.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    application_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'application',
            key: 'application_id',
        }
    },
    company_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'company',
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
            model: 'user',
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
    tableName: 'Company_Application_Token',
    timestamps: false,
});

export default Company_Application_Token;