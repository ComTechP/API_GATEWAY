import { DataTypes, Model, Sequelize } from "sequelize";

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

export class companyApplicationTokenModel extends Model<companyApplicationTokenAttributes, companyApplicationTokenCreationAttributes> implements companyApplicationTokenAttributes {
    public id!: number;
    public application_id!: number;
    public company_id!: number;
    public access_token!: string;
    public refresh_token!: string;
    public created_by_user!: number;
    public created_at!: Date;
    public is_active!: boolean;
}

export const initCompanyApplicationTokenModel = (sequelize: Sequelize) => {
    companyApplicationTokenModel.init({
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
        tableName: 'company_application_token',
        timestamps: false,
    }
  );
};

export type companyApplicationTokenInstance = typeof companyApplicationTokenModel & {
    new (): companyApplicationTokenModel;
};
