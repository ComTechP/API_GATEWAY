import { hash } from 'bcrypt';
import { Service } from 'typedi';
import  UserModel  from '../models/DBModels/UserModel';
import { HTTPException } from '../exceptions/HTTPexception';
import { CreateUserInterface } from '../interfaces/UserInterface';

type UserInstance = UserModel;

@Service()
export class UserService {
    public async findAllUsers(): Promise<UserInstance[]> {
        const allUsers: UserInstance[] = await UserModel.findAll();
        return allUsers;
    }

    public async findUserById(userId: number): Promise<UserInstance> {
        const findUser: UserInstance | null = await UserModel.findByPk(userId);
        if(!findUser)
            throw new HTTPException(409, "User Does Not Exist!");

        return findUser;
    }

    public async findUserByUsername(username: string): Promise<UserInstance> {
        const findUser: UserInstance | null = await UserModel.findOne({where: {username}});
        if(!findUser)
            throw new HTTPException(409 ,"User Does Not Exist!");

        return findUser;
    }

   public async createUser(userData: CreateUserInterface): Promise<UserInstance> {
        const findUser: UserInstance | null = await UserModel.findOne({where: {email: userData.email}});
        if(findUser)
            throw new HTTPException(409, `This Email ${userData.email} Already Exists!`);

        const hashedPassword = await hash(userData.password, 10);
        const createUserData: UserInstance = await UserModel.create({...userData, password_hash: hashedPassword});
        return createUserData;
   }

   public async updateUserById(userId: number, userData: CreateUserInterface): Promise<UserInstance> {
        const findUser: UserInstance | null = await UserModel.findByPk(userId);
        if(!findUser)
            throw new HTTPException(409, "User Does Not Exist!");

        const hashedPassword = await hash(userData.password, 10);
        await UserModel.update({...userData, password_hash: hashedPassword} , {where: {user_id: userId}});

        const updateUser: UserInstance | null = await UserModel.findByPk(userId);
        if (updateUser === null) 
            throw new HTTPException(404, "User Not Found!");
    
        return updateUser;
   }

   public async updateUserByUsername(username: string, userData: CreateUserInterface): Promise<UserInstance>{
        const findUser: UserInstance | null = await UserModel.findOne({where: {username}});

        if(!findUser)
            throw new HTTPException(409, "User Does Not Exist!");

        const userId: number = findUser.user_id;

        const hashedPassword = await hash(userData.password, 10);
        await UserModel.update({...userData, password_hash: hashedPassword}, {where: {user_id: userId}});

        const updateUser: UserInstance | null = await UserModel.findByPk(userId);
        if(updateUser === null)
            throw new HTTPException(404, "User Not Found!");

        return updateUser;
   }

   public async deleteUserById(userId: number): Promise<UserInstance> {
    const findUser: UserInstance | null = await UserModel.findByPk(userId);
    if(!findUser)
        throw new HTTPException(409, "User Does Not Exist!");

    await UserModel.destroy({where: {user_id: userId}});

    return findUser;
   }  

   public async deleteUserByUsername(username: string): Promise<UserInstance> {
    const findUser: UserInstance | null = await UserModel.findOne({where: {username}});
    if(!findUser)
        throw new HTTPException(409, "User Does Not Exist!");

    const userId: number = findUser.user_id;

    await UserModel.destroy({where: {user_id: userId}});

    return findUser;
   }
}

