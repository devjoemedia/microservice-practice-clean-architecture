import { injectable, inject } from "tsyringe";
import IAuthRepository from "../../domain/repositories/iauth-repository";
import { IHashService } from "../../domain/services/ihash-service";
import User from "../../domain/entities/User";

@injectable()
export class LoginUseCase {
  constructor(
    @inject("IAuthRepository") private authRepository: IAuthRepository,
    @inject("IHashService") private hashService: IHashService
  ) { }

  async execute(email: string, password: string): Promise<User> {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) throw new Error("User not found");

    const isValid = await this.hashService.comparePassword(password, user.password);
    if (!isValid) throw new Error("Invalid password");

    return user;
  }
}
