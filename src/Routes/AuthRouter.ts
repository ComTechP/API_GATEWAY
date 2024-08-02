import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { Routes } from '../interfaces/routesInterface';

class AuthRoute implements Routes {
    public path = '';
    public router = Router();
    public authController = new AuthController();
    
    constructor(){
        this.initializeRouter();
    }

    private initializeRouter(){
        this.router.post(`${this.path}/signUp`, this.authController.signUp);
        this.router.post(`${this.path}/login`, this.authController.logIn);
        this.router.post(`${this.path}/logout`, this.authController.logOut);
    }
}

export default AuthRoute;