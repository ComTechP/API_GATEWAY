import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

interface sessionTokenAttributes {
    token_id: number;
    user_id: number;
    access_token: string;
    refresh_token: string;
    issued_at: Date;
    expires_at: Date;
}

interface sessionTokenCreationAttributes extends Partial<sessionTokenAttributes>{}

class sessionTokenModel extends Model<sessionTokenAttributes, sessionTokenCreationAttributes> implements sessionTokenAttributes {
    public token_id!: number;
    public user_id!: number;
    public access_token!: string;
    public refresh_token!: string;
    public issued_at!: Date;
    public expires_at!: Date;
}

sessionTokenModel.init({
    token_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'userModel',
            key: 'user_id',
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
    issued_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},{
    sequelize,
    tableName: 'session_token',
    timestamps: false,
});

export default sessionTokenModel;