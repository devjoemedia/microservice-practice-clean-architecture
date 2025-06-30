import { injectable, inject } from "tsyringe";
import User from "../../domain/entities/User";
import IAuthRepository from "../../domain/repositories/iauth-repository";
import { IHashService } from "../../domain/services/ihash-service";

@injectable()
export class RegisterUseCase {
  constructor(
    @inject("IAuthRepository") private authRepository: IAuthRepository,
    @inject("IHashService") private hashService: IHashService
  ) { }

  async execute(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.authRepository.findUserByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await this.hashService.hashPassword(password);
    return this.authRepository.createUser(
      new User(
        Math.random().toString(36).substring(2, 10),
        name,
        email,
        hashedPassword,
        new Date()
      )
    );
  }
}
