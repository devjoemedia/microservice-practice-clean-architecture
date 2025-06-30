import { injectable } from "tsyringe";
import User from "../../domain/entities/User";
import IAuthRepository from "./iauth-repository";
import UserModel, { IUserDocument } from "../../infrastructure/database/models/user-model";

@injectable()
export class MongoUserRepository implements IAuthRepository {
  async createUser(user: User): Promise<User> {
    const newUser: IUserDocument = await UserModel.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
    });
    return new User(
      newUser.id,
      newUser.name,
      newUser.email,
      newUser.password,
      newUser.createdAt
    );
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) return null;
    return new User(
      userDoc.id,
      userDoc.name,
      userDoc.email,
      userDoc.password,
      userDoc.createdAt
    );
  }
}
