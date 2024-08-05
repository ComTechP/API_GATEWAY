import { Router } from 'express';
import UserRoute from './UserRouter';
import AuthRoute from './AuthRouter';
import CompanyRoute from './CompanyRouter';
import dotenv = require('dotenv');

dotenv.config({path: '../../.env'});

const router = Router();

const userRoute = new UserRoute();
const authRoute = new AuthRoute();
const companyRoute = new CompanyRoute();

router.use('/users', userRoute.router);
router.use('/authentication', authRoute.router);
router.use('/company', companyRoute.router);

export default router;