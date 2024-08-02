import { DataTypes, Model } from "sequelize";
import sequelize from "../index";

interface User_Group_Attributes {
    group_id: number;
    company_id: number;
    group_name: string;
    description: string;
    access: string;
    created_at: Date;
}

interface User_Group_Creation_Attributes extends Partial<User_Group_Attributes>{}

class User_Group extends Model<User_Group_Attributes, User_Group_Creation_Attributes> implements User_Group_Attributes {
    public group_id!: number;
    public company_id!: number;
    public group_name!: string;
    public description!: string;
    public access!: string;
    public created_at!: Date;
}

User_Group.init({
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
    tableName: 'User_Group',
    timestamps: false
});

export default User_Group;