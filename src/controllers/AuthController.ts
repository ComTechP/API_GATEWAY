import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { userModel } from '../models/DBModels/UserModel';
import { CreateUserInterface, logInUserInterface } from '../interfaces/UserInterface';
import { RequestWithUser } from '../interfaces/AuthInterface';
import { AuthService } from '../Services/AuthService';

type userInstance = userModel;

export class AuthController {
    public authService = Container.get(AuthService);

    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const userData: CreateUserInterface = req.body;
            const signUpUserData: userInstance = await this.authService.signUp(userData);

            res.status(201).json({data: signUpUserData, message: 'User Signed Up'});
        }catch(error){
            next(error);
        }
    };

    public logIn = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const userData: logInUserInterface = req.body;
            const { cookie, findUser} = await this.authService.logIn(userData);

            res.setHeader('Set-Cookie', [cookie]);
            res.status(200).json({data: findUser, message: 'User Logged In.'});

        }catch(error){
            next(error);
        }
    };

    public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try{
            const userData: userInstance = req.body;
            const logOutUserData: userInstance = await this.authService.logOut(userData);

            res.setHeader('Set-Cookie', ['Authoriztion=; LifeTime=0']);
            res.status(200).json({data: logOutUserData, message: 'User Logged Out.'});
        }catch(error){
            next(error);
        }
    };
}


