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
        this.router.get(`${this.path}/getAll`, this.userController.getAllUsers);
        this.router.get(`${this.path}/getById/:id(\\d+)`, this.userController.getUserById);
        this.router.get(`${this.path}/getByUsername/:username(\\w+)`, this.userController.getUserByUsername);
        this.router.post(`${this.path}/create`, this.userController.createUser);
        this.router.put(`${this.path}/updateById/:id(\\d+)`, this.userController.updateUserById);
        this.router.put(`${this.path}/updateByUsername/:username(\\w+)`, this.userController.updateUserByUsername);
        this.router.delete(`${this.path}/deleteById/:id(\\d+)`, this.userController.deleteUserById);
        this.router.delete(`${this.path}/deleteByUsername/:username(\\w+)`, this.userController.deleteUserByUsername);
    }
}

export default UserRoute;