import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

interface userAttributes {
    user_id: number;
    company_id: number;
    group_id: number;
    username: string;
    password_hash: string;
    email: string;
    role: number;
    status: number;
    created_at: Date;
    last_login: Date;
    profile_url: string;
}

interface userCreationAttributes extends Partial<userAttributes>{}

class userModel extends Model<userAttributes, userCreationAttributes> implements userAttributes {
    public user_id!: number;
    public company_id!: number;
    public group_id!: number;
    public username!: string;
    public password_hash!: string;
    public email!: string;
    public role!: number;
    public status!: number;
    public created_at!: Date;
    public last_login!: Date;
    public profile_url!: string;
}

userModel.init({
    user_id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true
    },
    company_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'companyModel',
            key: 'company_id'
        }
    },
    group_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'userGroupModel',
            key: 'group_id'
        }
    },
    username: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(32),
        unique: true,
        allowNull: false
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    last_login: {
        type: DataTypes.DATE
    },
    profile_url: {
        type: DataTypes.STRING(255)
    }
},{
    sequelize,
    tableName: 'user',
    timestamps: false,
});

export default userModel;