import { DataTypes, Model, Sequelize } from "sequelize";

interface userGroupAttributes {
    group_id: number;
    company_id: number;
    group_name: string;
    description: string;
    access: string;
    created_at: Date;
}

interface userGroupCreationAttributes extends Partial<userGroupAttributes>{}

export class userGroupModel extends Model<userGroupAttributes, userGroupCreationAttributes> implements userGroupAttributes {
    public group_id!: number;
    public company_id!: number;
    public group_name!: string;
    public description!: string;
    public access!: string;
    public created_at!: Date;
}

export const initUserGroupModel = (sequelize: Sequelize) => {
    userGroupModel.init({
    group_id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true
    },
    company_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'company',
            key: 'company_id'
        }
    },
    group_name: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(16)
    },
    access: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
    },{
        sequelize,
        tableName: 'user_group',
        timestamps: false
    }
  );
};

export type userGroupInstance = typeof userGroupModel & {
    new (): userGroupModel;
};

