import {DataTypes, Model, Sequelize} from 'sequelize';


interface cacheAttributes{
    cache_id: number;
    cache_key: number;
    value: string;
    created_at: Date;
    expires_at: Date;
}

interface cacheCreationAttributes extends Partial<cacheAttributes>{}

export class cacheModel extends Model<cacheAttributes, cacheCreationAttributes> implements cacheAttributes{
    public cache_id!: number;
    public cache_key!: number;
    public value!: string;
    public created_at!: Date;
    public expires_at!: Date;
}

export const initCacheModel = (sequelize: Sequelize) => {
    cacheModel.init({
    cache_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    cache_key:{
        type: DataTypes.INTEGER,
        unique: true,
    },
    value:{
        type: DataTypes.STRING(64),
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    expires_at:{
        type: DataTypes.DATE,
    }
    } , {
            sequelize,
            tableName: 'cache',
            timestamps: false,
    }
  );
};

export type cacheInstance = typeof cacheModel & {
    new (): cacheModel;
};

