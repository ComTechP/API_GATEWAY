import { Service } from "typedi";
import { sessionTokenModel } from "../models/DBModels/SessionTokenModel";
import { HTTPException } from "../exceptions/HTTPexception";
import { generateSessionTokenInterface, createSessionTokenInterface} from "../interfaces/sessionTokenInterface";

type sessionTokenInstance = sessionTokenModel;

@Service()
export class sessionTokenService {
    public async findAllTokens(): Promise<sessionTokenInstance[]> {
        const allTokens: sessionTokenInstance[] = await sessionTokenModel.findAll();
        return allTokens;
    }

    public async createSessionToken(sessionTokenData: createSessionTokenInterface): Promise<sessionTokenInstance> {
        const createSessionTokenData: sessionTokenInstance = await sessionTokenModel.create({...sessionTokenData});
        return createSessionTokenData;
    }
}