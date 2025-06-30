import { container } from "tsyringe";
import { AuthController } from "../../interface/controllers/AuthController";
import IAuthRepository from "../../domain/repositories/iauth-repository";
import { MongoUserRepository } from "../../domain/repositories/imongo-user-repository";
import { IHashService } from "../../domain/services/ihash-service";
import { BcryptHashService } from "../services/bcrypt-hash-service";
import { ITokenService } from "../../domain/services/itoken-service";
import { JwtTokenService } from "../services/jwt-token-service";
import { RegisterUseCase } from "../../application/use-cases/register-use-case";
import { LoginUseCase } from "../../application/use-cases/login-use-case";

// Register repositories
container.register<IAuthRepository>("IAuthRepository", {
  useClass: MongoUserRepository,
});

// Register services
container.register<IHashService>("IHashService", {
  useClass: BcryptHashService,
});

container.register<ITokenService>("ITokenService", {
  useClass: JwtTokenService,
});

// Register use cases
container.register<RegisterUseCase>("RegisterUseCase", {
  useClass: RegisterUseCase,
});

container.register<LoginUseCase>("LoginUseCase", {
  useClass: LoginUseCase,
});

// Register controllers
container.register<AuthController>("AuthController", {
  useClass: AuthController,
});
