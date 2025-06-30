import { injectable } from 'tsyringe';
import UserModel, { IUserDocument } from './UserModel';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import User from '../../../domain/entities/User';

@injectable()
export class MongoUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const newUserDocument: IUserDocument = await UserModel.create({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
    return new User(
      newUserDocument.id,
      newUserDocument.name,
      newUserDocument.email,
      newUserDocument.createdAt
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDocument: IUserDocument | null = await UserModel.findOne({ email });
    if (!userDocument) {
      return null;
    }
    return new User(
      userDocument.id,
      userDocument.name,
      userDocument.email,
      userDocument.createdAt
    );
  }

  async findById(id: string): Promise<User | null> {
    const userDocument: IUserDocument | null = await UserModel.findOne({ id });
    if (!userDocument) {
      return null;
    }
    return new User(
      userDocument.id,
      userDocument.name,
      userDocument.email,
      userDocument.createdAt
    );
  }

  async findAll(): Promise<User[]> {
    const userDocuments: IUserDocument[] = await UserModel.find({});
    return userDocuments.map((userDocument) => new User(
      userDocument.id,
      userDocument.name,
      userDocument.email,
      userDocument.createdAt
    ));
  }
}
