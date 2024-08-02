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
        this.router.get(`${this.path}`, this.userController.getAllUsers);
        this.router.get(`${this.path}/:id(\\d+)`, this.userController.getUserById);
        this.router.get(`${this.path}/:username(\\w+)`, this.userController.getUserByUsername);
        this.router.post(`${this.path}`, this.userController.createUser);
        this.router.put(`${this.path}/:id(\\d+)`, this.userController.updateUserById);
        this.router.put(`${this.path}/:username(\\w+)`, this.userController.updateUserByUsername);
        this.router.delete(`${this.path}/:id(\\d+)`, this.userController.deleteUserById);
        this.router.delete(`${this.path}/:username(\\w+)`, this.userController.deleteUserByUsername);
    }
}

export default UserRoute;