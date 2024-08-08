import { companyModel } from "../models/DBModels/CompanyModel";
import { HTTPException } from "../exceptions/HTTPexception";
import { CreateCompanyInterface, UpdateCompanyInterface } from "../interfaces/CompanyInterface";
import { Service } from "typedi";

type companyInstance = companyModel;

@Service()
export class CompanyService {
    public async findAllComapnies(): Promise<companyInstance[]>{
        const allCompanies: companyInstance[] = await companyModel.findAll();
        return allCompanies;
    }

    public async findCompanyById(companyId: number): Promise<companyInstance>{
        const findCompany: companyInstance | null = await companyModel.findByPk(companyId);
        if(!findCompany)
            throw new HTTPException(409, 'Company Does Not Exist!');

        return findCompany;
    }

    public async findCompanyByName(company_name: string): Promise<companyInstance>{
        const findCompany: companyInstance | null = await companyModel.findOne({where: {company_name}});

        if(!findCompany)
            throw new HTTPException(409, 'Company Does Not Exist!');

        return findCompany;
    }

    public async createCompany(companyData: CreateCompanyInterface): Promise<companyInstance>{
        var website: string = companyData.CompanyWebsite;
        const findCompany: companyInstance | null = await companyModel.findOne({where: {website}});

        if(!findCompany)
            throw new HTTPException(409, `This Website ${companyData.CompanyWebsite} Already Exists!`);

        const CreateCompanyData: companyInstance = await companyModel.create({...companyData});
        return CreateCompanyData;
    }

    public async UpdateCompanyById(companyId: number, companyData: UpdateCompanyInterface): Promise <companyInstance>{
        const findCompany: companyInstance | null = await companyModel.findByPk(companyId);
        if(!findCompany)
            throw new HTTPException(409, 'Company Does Not Exist!');

        await companyModel.update({...companyData}, {where: {company_id: companyId}});

        const updateCompany: companyInstance | null = await companyModel.findByPk(companyId);

        if(updateCompany === null)
            throw new HTTPException(404, 'Company Not Found!');

        return updateCompany;
    }

    public async UpdateCompanyByName(company_name: string, companyData: UpdateCompanyInterface): Promise<companyInstance>{
        const findCompany: companyInstance | null = await companyModel.findOne({where: {company_name}});
        if(!findCompany)
            throw new HTTPException(409, 'Company Does Not Exist!');

        const companyId: number = findCompany.company_id;

        await companyModel.update({...companyData}, {where: {company_id: companyId}});

        const updateCompany: companyInstance | null = await companyModel.findByPk(companyId);

        if(updateCompany === null)
            throw new HTTPException(404, 'Company Not Found!');

        return updateCompany;
    }

    public async deleteCompanyById(companyId: number): Promise<companyInstance>{
        const findCompany: companyInstance | null = await companyModel.findByPk(companyId);

        if(!findCompany)
            throw new HTTPException(409, 'Company Does Not Exist!');

        await companyModel.destroy({where: {company_id: companyId}});

        return findCompany;
    }

    public async deleteCompanyByName(company_name: string): Promise<companyInstance>{
        const findCompany: companyInstance | null = await companyModel.findOne({where: {company_name}});
        
        if(!findCompany)
            throw new HTTPException(409, 'Company Does Not Exist!');

        const companyId: number = findCompany.company_id;
        await companyModel.destroy({where: {company_id: companyId}});

        return findCompany;
    }
}