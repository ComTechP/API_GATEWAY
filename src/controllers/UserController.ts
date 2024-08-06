import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import  userModel from '../models/DBModels/UserModel';
import { CreateUserInterface } from '../interfaces/UserInterface';
import { UserService } from '../Services/UserService';

type userInstance = userModel;

export class UserController {
    public userService = Container.get(UserService);

    public getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const FindAllUsers: userInstance[] = await this.userService.findAllUsers();

            res.status(200).json({data: FindAllUsers, message: "All User's Data"});
        } catch(error){
            next(error);
        }
    };

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const UserId = Number(req.params.id);
            const FindUser = await this.userService.findUserById(UserId);

            res.status(200).json({data: FindUser, message: "User Found."});
        }catch(error){
            next(error);
        }
    };

    public getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const username = String(req.params.username);
            const FindUser = await this.userService.findUserByUsername(username);

            res.status(200).json({data: FindUser, message: "User Found."});

        }catch(error){
            next(error);
        };
    };

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const userData: CreateUserInterface = req.body;
            const createUserData: userInstance = await this.userService.createUser(userData);

            res.status(200).json({data: createUserData, message: "User Created."});
        }catch(error){
            next(error);
        }
    };

    public updateUserById = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const id = Number(req.params.id);
            const userData: CreateUserInterface = req.body;
            const updateUserData: userInstance = await this.userService.updateUserById(id, userData);

            res.status(200).json({data: updateUserData, message: "User Updated."});
        }catch(error){
            next(error);
        }
    };

    public updateUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const username = String(req.params.username);
            const userData: CreateUserInterface = req.body;
            const updateUserData: userInstance = await this.userService.updateUserByUsername(username, userData);

            res.status(200).json({data: updateUserData, message: "User Updated."});
        }catch(error){
            next(error);
        }
    };

    public deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const id = Number(req.params.id);
            const deleteUser: userInstance = await this.userService.deleteUserById(id);

            res.status(200).json({data: deleteUser, message: "User Deleted."});
        }catch(error){
            next(error);
        }
    };

    public deleteUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const username = String(req.params.username);
            const deleteUser: userInstance = await this.userService.deleteUserByUsername(username);

            res.status(200).json({data: deleteUser, message: "User Deleted."});
        }catch(error){
            next(error);
        }
    };
}

