import { Router } from 'express';
import { Routes } from '../interfaces/routesInterface';
import { CompanyController } from '../controllers/CompanyController';

class CompanyRoute implements Routes {
    public path = '';
    public router = Router();
    public companyController = new CompanyController();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(`${this.path}/getAll`, this.companyController.getAllCompanies);
        this.router.get(`${this.path}/getById/:id(\\d+)`, this.companyController.getCompanyById);
        this.router.get(`${this.path}/getByName/:name(\\w+)`, this.companyController.getCompanyByName);
        this.router.post(`${this.path}/create`, this.companyController.createCompany);
        this.router.put(`${this.path}/updateById/:id(\\d+)`, this.companyController.updateCompanyById);
        this.router.put(`${this.path}/updateByName/:name(\\w+)`, this.companyController.updateComapnyByName);
        this.router.delete(`${this.path}/deleteById/:id(\\d+)`, this.companyController.deleteCompanyById);
        this.router.delete(`${this.path}/deleteByName/:name(\\w+)`, this.companyController.deleteCompanyByName);
    }
}

export default CompanyRoute;