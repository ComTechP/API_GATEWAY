import CompanyModel from "../models/DBModels/CompanyModel";
import { HTTPException } from "../exceptions/HTTPexception";
import { CreateCompanyInterface, UpdateCompanyInterface } from "../interfaces/CompanyInterface";
import { Service } from "typedi";

type CompanyInstance = CompanyModel;

@Service()
export class CompanyService {
    public async findAllComapnies(): Promise<CompanyInstance[]>{
        const allCompanies: CompanyInstance[] = await CompanyModel.findAll();
        return allCompanies;
    }

    public async findCompanyById(companyId: number): Promise<CompanyInstance>{
        const findCompany: CompanyInstance | null = await CompanyModel.findByPk(companyId);
        if(!findCompany)
            throw new HTTPException(409, 'Company Does Not Exist!');

        return findCompany;
    }

    public async findCompanyByName(company_name: string): Promise<CompanyInstance>{
        const findCompany: CompanyInstance | null = await CompanyModel.findOne({where: {company_name}});

        if(!findCompany)
            throw new HTTPException(409, 'Company Does Not Exist!');

        return findCompany;
    }

    public async createCompany(companyData: CreateCompanyInterface): Promise<CompanyInstance>{
        var website: string = companyData.CompanyWebsite;
        const findCompany: CompanyInstance | null = await CompanyModel.findOne({where: {website}});

        if(!findCompany)
            throw new HTTPException(409, `This Website ${companyData.CompanyWebsite} Already Exists!`);

        const CreateCompanyData: CompanyInstance = await CompanyModel.create({...companyData});
        return CreateCompanyData;
    }

    public async UpdateCompanyById(companyId: number, companyData: UpdateCompanyInterface): Promise <CompanyInstance>{
        const findCompany: CompanyInstance | null = await CompanyModel.findByPk(companyId);
        if(!findCompany)
            throw new HTTPException(409, 'Company Does Not Exist!');

        await CompanyModel.update({...companyData}, {where: {company_id: companyId}});

        const updateCompany: CompanyInstance | null = await CompanyModel.findByPk(companyId);

        if(updateCompany === null)
            throw new HTTPException(404, 'Company Not Found!');

        return updateCompany;
    }

    public async UpdateCompanyByName(company_name: string, companyData: UpdateCompanyInterface): Promise<CompanyInstance>{
        const findCompany: CompanyInstance | null = await CompanyModel.findOne({where: {company_name}});
        if(!findCompany)
            throw new HTTPException(409, 'Company Does Not Exist!');

        const companyId: number = findCompany.company_id;

        await CompanyModel.update({...companyData}, {where: {company_id: companyId}});

        const updateCompany: CompanyInstance | null = await CompanyModel.findByPk(companyId);

        if(updateCompany === null)
            throw new HTTPException(404, 'Company Not Found!');

        return updateCompany;
    }

    public async deleteCompanyById(companyId: number): Promise<CompanyInstance>{
        const findCompany: CompanyInstance | null = await CompanyModel.findByPk(companyId);

        if(!findCompany)
            throw new HTTPException(409, 'Company Does Not Exist!');

        await CompanyModel.destroy({where: {company_id: companyId}});

        return findCompany;
    }

    public async deleteCompanyByName(company_name: string): Promise<CompanyInstance>{
        const findCompany: CompanyInstance | null = await CompanyModel.findOne({where: {company_name}});
        
        if(!findCompany)
            throw new HTTPException(409, 'Company Does Not Exist!');

        const companyId: number = findCompany.company_id;
        await CompanyModel.destroy({where: {company_id: companyId}});

        return findCompany;
    }
}