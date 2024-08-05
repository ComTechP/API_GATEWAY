import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

interface Session_Token_Attributes {
    token_id: number;
    user_id: number;
    access_token: string;
    refresh_token: string;
    issued_at: Date;
    expires_at: Date;
}

interface Session_Token_Creation_Attributes extends Partial<Session_Token_Attributes>{}

class Session_Token extends Model<Session_Token_Attributes, Session_Token_Creation_Attributes> implements Session_Token_Attributes {
    public token_id!: number;
    public user_id!: number;
    public access_token!: string;
    public refresh_token!: string;
    public issued_at!: Date;
    public expires_at!: Date;
}

Session_Token.init({
    token_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
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

export default Session_Token;