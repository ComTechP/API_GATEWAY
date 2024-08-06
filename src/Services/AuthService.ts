import bcrypt from 'bcrypt';
import {sign} from "jsonwebtoken";
import { CreateUserInterface, logInUserInterface } from '../interfaces/UserInterface';
import { HTTPException } from '../exceptions/HTTPexception';
import userModel from '../models/DBModels/UserModel';
import session_Token from '../models/DBModels/SessionTokenModel';
import { DataStoredInToken, TokenData } from '../interfaces/AuthInterface';
import { Service } from 'typedi';

type userInstance = userModel;

const GenerateToken = (user: userInstance): TokenData => {
    const DataStoredInToken: DataStoredInToken = {user_id: user.user_id};
    //Access Token expires in 30 minutes
    const expiresIn: number = 60 * 30; 

    const access_token = sign(DataStoredInToken, 'Access_Token', {expiresIn});
    const refresh_token = sign(DataStoredInToken, 'Refresh_Token', {expiresIn: 2 * 60 * 60});

    return {
        access_token,
        refresh_token,
        expiresIn,
    };
}

const CreateCookie = (tokenData: TokenData): string => {
    return `User Authorized. Access_Token: ${tokenData.access_token}, Refresh_Token: ${tokenData.refresh_token}; HTTP-Only; LifeTime: ${tokenData.expiresIn}`;
}

@Service()
export class AuthService {

    public async signUp(userData: CreateUserInterface): Promise<userInstance> {
        const findEmail: userInstance | null = await userModel.findOne({where: {email: userData.email}});
        const findUsername: userInstance | null = await userModel.findOne({where: {username: userData.username}});

        if(findEmail)
            throw new HTTPException(409, 'This email already exists!');

        if(findUsername)
            throw new HTTPException(409, 'This username already exists!');

        
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const CreateUserData: userInstance = await userModel.create({...userData, password_hash: hashedPassword});

        return CreateUserData;
    }


    public async logIn(userData: logInUserInterface): Promise<{cookie: string; findUser: userInstance}> {
        const findUser: userInstance | null = await userModel.findOne({where: {username: userData.username}});
        
        if(!findUser)
            throw new HTTPException(409, 'This Username Does Not Exist!');

        //const passwordMatching: boolean = await bcrypt.compare(userData.password, findUser.password_hash);
        const passwordMatching: boolean = userData.password === findUser.password_hash;

        if(!passwordMatching)
            throw new HTTPException(409, 'Password is Not Correct!');

        const tokenData = GenerateToken(findUser);
        const cookie = CreateCookie(tokenData);

        
        await session_Token.update(
            {access_token: tokenData.access_token, refresh_token: tokenData.refresh_token},
            {where: {user_id: findUser.user_id}}
        );

        return { cookie, findUser};

    }

    public async logOut(userData: userInstance): Promise<userInstance>{
        const findUser: userInstance | null = await userModel.findOne({where: {username: userData.username}});

        if(!findUser)
            throw new HTTPException(409, 'This Username Does Not Exist!');

        await session_Token.destroy({where: {user_id: findUser.user_id}});

        return findUser;
    }
}