import { Request } from 'express';
import { userModel } from '../models/DBModels/UserModel';

export interface DataStoredInToken{
    user_id: number;
}

export interface TokenData {
    access_token: string;
    refresh_token: string;
    expiresIn: number;
}

export interface RequestWithUser extends Request {
    user?: userModel;
}