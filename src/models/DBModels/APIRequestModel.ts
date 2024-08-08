import { DataTypes, Model, Sequelize } from "sequelize";


interface apiRequestAttributes {
  request_id: number;
  user_id: number;
  service_id: number;
  time: Date;
  request_method: string;
  request_url: string;
  status_code: number;
}

interface apiRequestCreationAttributes extends Partial<apiRequestAttributes> {}

export class apiRequestModel extends Model<apiRequestAttributes, apiRequestCreationAttributes> implements apiRequestAttributes {
  public request_id!: number;
  public user_id!: number;
  public service_id!: number;
  public time!: Date;
  public request_method!: string;
  public request_url!: string;
  public status_code!: number;
}

export const initApiRequestModel = (sequelize: Sequelize) => {
  apiRequestModel.init(
  {
    request_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "user_id",
      },
    },
    service_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "service",
        key: "service_id",
      },
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    request_method: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    request_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "api_request",
    timestamps: false,
  }
 );
};

export type apiRequestInstance = typeof apiRequestModel & {
  new (): apiRequestModel;
};


