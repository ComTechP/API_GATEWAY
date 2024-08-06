import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { Routes } from '../interfaces/routesInterface';

class UserRoute implements Routes {
    public path = '';
    public router = Router();
    public userController = new UserController();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(`${this.path}/getAllUsers`, this.userController.getAllUsers);
        this.router.get(`${this.path}/getUserById/:id(\\d+)`, this.userController.getUserById);
        this.router.get(`${this.path}/getUserByUsername/:username(\\w+)`, this.userController.getUserByUsername);
        this.router.post(`${this.path}/createUser`, this.userController.createUser);
        this.router.put(`${this.path}/updateUserById/:id(\\d+)`, this.userController.updateUserById);
        this.router.put(`${this.path}/updateUserByUsername/:username(\\w+)`, this.userController.updateUserByUsername);
        this.router.delete(`${this.path}/deleteUserById/:id(\\d+)`, this.userController.deleteUserById);
        this.router.delete(`${this.path}/deleteUserByUsername/:username(\\w+)`, this.userController.deleteUserByUsername);
    }
}

export default UserRoute;