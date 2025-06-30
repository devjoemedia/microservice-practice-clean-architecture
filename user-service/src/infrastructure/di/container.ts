import 'reflect-metadata'; // Must be imported once at the entry point of the app
import { container } from 'tsyringe';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { UserController } from '../../interface/controllers/UserController';
import { MongoUserRepository } from '../database/models/MongoUserRepository';
import { GetUserUseCase } from '../../application/use-cases/GetUserUseCase';
import { GetUsersUseCase } from '../../application/use-cases/GetUsersUseCase';

// Register concrete implementations for interfaces/classes
container.register<IUserRepository>('IUserRepository', {
  useClass: MongoUserRepository,
});

container.register<CreateUserUseCase>('CreateUserUseCase', {
  useClass: CreateUserUseCase,
});

container.register<GetUserUseCase>('GetUserUseCase', {
  useClass: GetUserUseCase,
});

container.register<GetUsersUseCase>('GetUsersUseCase', {
  useClass: GetUsersUseCase,
});

// Register controllers (optional, can also be resolved directly in routes)
container.register<UserController>('UserController', {
  useClass: UserController,
});
