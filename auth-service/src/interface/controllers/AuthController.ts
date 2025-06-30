import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { ITokenService } from "../../domain/services/itoken-service";
import { RegisterUseCase } from "../../application/use-cases/register-use-case";
import { LoginUseCase } from "../../application/use-cases/login-use-case";

@injectable()
export class AuthController {
  constructor(
    @inject("RegisterUseCase") private registerUseCase: RegisterUseCase,
    @inject("LoginUseCase") private loginUseCase: LoginUseCase,
    @inject("ITokenService") private tokenService: ITokenService
  ) { }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const user = await this.registerUseCase.execute(name, email, password);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await this.loginUseCase.execute(email, password);
      const token = this.tokenService.generateToken({ userId: user.id });
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}
