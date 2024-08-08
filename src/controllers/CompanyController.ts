import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { companyModel } from '../models/DBModels/CompanyModel';
import { CreateCompanyInterface } from '../interfaces/CompanyInterface';
import { CompanyService } from '../Services/CompanyService';

type companyInstance = companyModel;

export class CompanyController {
    public companyService = Container.get(CompanyService);

    public getAllCompanies = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const findAllComapnies: companyInstance[] = await this.companyService.findAllComapnies();

            res.status(200).json({data: findAllComapnies, message: "All Comapnies' Data." });
        }catch(error){
            next(error);
        }
    };

    public getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const CompanyId = Number(req.params.id);
            const findCompany: companyInstance = await this.companyService.findCompanyById(CompanyId);
            res.status(200).json({data: findCompany, message: "Company Found."});
        }catch(error){
            next(error);
        }
    };

    public getCompanyByName = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const CompanyName = String(req.params.CompanyName);
            const findCompany: companyInstance = await this.companyService.findCompanyByName(CompanyName);
            res.status(200).json({data: findCompany, message: "Company Found."});
        }catch(error){
            next(error);
        }
    };

    public createCompany = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const companyData: CreateCompanyInterface = req.body;
            const createCompanyData: companyInstance = await this.companyService.createCompany(companyData);

            res.status(200).json({data: createCompanyData, message: "Comapny Created."});
        }catch(error){
            next(error);
        }
    };

    public updateCompanyById = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const id = Number(req.params.id);
            const companyData: CreateCompanyInterface = req.body;
            const UpdateCompanyData: companyInstance = await this.companyService.UpdateCompanyById(id, companyData);

            res.status(200).json({data: companyData, message: "Company Updated."});
        }catch(error){
            next(error);
        }
    };

    public updateComapnyByName = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const CompanyName = String(req.params.name);
            const companyData: CreateCompanyInterface = req.body;
            const UpdateCompanyData: companyInstance = await this.companyService.UpdateCompanyByName(CompanyName, companyData);

            res.status(200).json({data: companyData, message: "Company Updated."});
        }catch(error){
            next(error);
        }
    };

    public deleteCompanyById = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const id = Number(req.params.id);
            const deleteCompany: companyInstance = await this.companyService.deleteCompanyById(id);

            res.status(200).json({data: deleteCompany, message: "Company Deleted."});
        }catch(error){
            next(error);
        }
    };

    public deleteCompanyByName = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const CompanyName = String(req.params.name);
            const deleteCompany: companyInstance = await this.companyService.deleteCompanyByName(CompanyName);
            
            res.status(200).json({data: deleteCompany, message: "Company Deleted."});
        }catch(error){
            next(error);
        }
    };
}