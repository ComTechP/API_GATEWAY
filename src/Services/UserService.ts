import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { userModel } from '../models/DBModels/UserModel';
import { HTTPException } from '../exceptions/HTTPexception';
import { CreateUserInterface } from '../interfaces/UserInterface';

type userInstance = userModel;

@Service()
export class UserService {
    public async findAllUsers(): Promise<userInstance[]> {
        const allUsers: userInstance[] = await userModel.findAll();
        return allUsers;
    }

    public async findUserById(userId: number): Promise<userInstance> {
        const findUser: userInstance | null = await userModel.findByPk(userId);
        if(!findUser)
            throw new HTTPException(409, "User Does Not Exist!");

        return findUser;
    }

    public async findUserByUsername(userName: string): Promise<userInstance> {
        const findUser: userInstance | null = await userModel.findOne({where: {username: userName}});
        if(!findUser)
            throw new HTTPException(409 ,"User Does Not Exist!");

        return findUser;
    }

   public async createUser(userData: CreateUserInterface): Promise<userInstance> {
        const findUser: userInstance | null = await userModel.findOne({where: {email: userData.email}});
        if(findUser)
            throw new HTTPException(409, `This Email ${userData.email} Already Exists!`);

        const hashedPassword = await hash(userData.password, 10);
        const createUserData: userInstance = await userModel.create({...userData, password_hash: hashedPassword});
        return createUserData;
   }

   public async updateUserById(userId: number, userData: CreateUserInterface): Promise<userInstance> {
        const findUser: userInstance | null = await userModel.findByPk(userId);
        if(!findUser)
            throw new HTTPException(409, "User Does Not Exist!");

        const hashedPassword = await hash(userData.password, 10);
        await userModel.update({...userData, password_hash: hashedPassword} , {where: {user_id: userId}});

        const updateUser: userInstance | null = await userModel.findByPk(userId);
        if (updateUser === null) 
            throw new HTTPException(404, "User Not Found!");
    
        return updateUser;
   }

   public async updateUserByUsername(userName: string, userData: CreateUserInterface): Promise<userInstance>{
        const findUser: userInstance | null = await userModel.findOne({where: {username: userName}});

        if(!findUser)
            throw new HTTPException(409, "User Does Not Exist!");

        const userId: number = findUser.user_id;

        const hashedPassword = await hash(userData.password, 10);
        await userModel.update({...userData, password_hash: hashedPassword}, {where: {user_id: userId}});

        const updateUser: userInstance | null = await userModel.findByPk(userId);
        if(updateUser === null)
            throw new HTTPException(404, "User Not Found!");

        return updateUser;
   }

   public async deleteUserById(userId: number): Promise<userInstance> {
    const findUser: userInstance | null = await userModel.findByPk(userId);
    if(!findUser)
        throw new HTTPException(409, "User Does Not Exist!");

    await userModel.destroy({where: {user_id: userId}});

    return findUser;
   }  

   public async deleteUserByUsername(username: string): Promise<userInstance> {
    const findUser: userInstance | null = await userModel.findOne({where: {username}});
    if(!findUser)
        throw new HTTPException(409, "User Does Not Exist!");

    const userId: number = findUser.user_id;

    await userModel.destroy({where: {user_id: userId}});

    return findUser;
   }
}

