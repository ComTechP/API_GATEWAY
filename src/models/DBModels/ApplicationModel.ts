import {DataTypes, Model, Sequelize} from 'sequelize';


interface applicationAttributes{
    application_id: number;
    name: string;
    url: string;
    created_at: Date;
}

interface applicationCreationAttributes extends Partial<applicationAttributes>{}

export class applicationModel extends Model<applicationAttributes, applicationCreationAttributes> implements applicationAttributes{
    public application_id!: number;
    public name!: string;
    public url!: string;
    public created_at!: Date;
}

export const initApplicationModel = (sequelize: Sequelize) => {
  applicationModel.init({
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
          tableName: 'application',
          timestamps: false,

    }
  );
};

export type applicationInstance = typeof applicationModel & {
  new (): applicationModel;
};
