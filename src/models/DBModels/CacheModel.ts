import {DataTypes, Model} from 'sequelize';
import sequelize from '../connection';

interface CacheAttributes{
    cache_id: number;
    cache_key: number;
    value: string;
    created_at: Date;
    expires_at: Date;
}

interface CacheCreationAttributes extends Partial<CacheAttributes>{}

class Cache extends Model<CacheAttributes, CacheCreationAttributes> implements CacheAttributes{
    public cache_id!: number;
    public cache_key!: number;
    public value!: string;
    public created_at!: Date;
    public expires_at!: Date;
}

Cache.init({
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
        tableName: 'Cache',
        timestamps: false,
});

export default Cache;