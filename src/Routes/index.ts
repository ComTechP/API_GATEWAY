import { Router } from 'express';
import UserRoute from './UserRouter';
import AuthRoute from './AuthRouter';
import dotenv = require('dotenv');

dotenv.config({path: '../../.env'});

const router = Router();

const userRoute = new UserRoute();
const authRoute = new AuthRoute();

router.use('/users', userRoute.router);
router.use('/authentication', authRoute.router);

export default router;