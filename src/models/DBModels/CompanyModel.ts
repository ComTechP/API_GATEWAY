import {DataTypes, Model, Sequelize} from 'sequelize';


interface companyAttributes{
    company_id: number;
    company_name: string;
    website: string;
    phone: string;
    created_at: Date;
    scont_url: string;
}

interface companyCreationAttributes extends Partial<companyAttributes>{}

export class companyModel extends Model<companyAttributes, companyCreationAttributes> implements companyAttributes{
    public company_id!: number;
    public company_name!: string;
    public website!: string;
    public phone!: string;
    public created_at!: Date;
    public scont_url!: string;
}

export const initCompanyModel = (sequelize: Sequelize) => {
    companyModel.init({
    company_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    company_name:{
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    website:{
        type: DataTypes.STRING(64),
    },
    phone:{
        type: DataTypes.STRING(32),
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    scont_url:{
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    }
    },{ 
        sequelize,
        tableName: 'company',
        timestamps: false,
    }
  );
};

export type companyInstance = typeof companyModel & {
    new (): companyModel;
};
