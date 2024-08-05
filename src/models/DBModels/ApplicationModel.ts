import {DataTypes, Model} from 'sequelize';
import sequelize from '../connection';

interface ApplicationAttributes{
    application_id: number;
    name: string;
    url: string;
    created_at: Date;
}

interface ApplicationCreationAttributes extends Partial<ApplicationAttributes>{}

class Application extends Model<ApplicationAttributes, ApplicationCreationAttributes> implements ApplicationAttributes{
    public application_id!: number;
    public name!: string;
    public url!: string;
    public created_at!: Date;
}

Application.init({
    application_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    }, {
      sequelize,
      tableName: 'Application',
      timestamps: false,

});

export default Application;