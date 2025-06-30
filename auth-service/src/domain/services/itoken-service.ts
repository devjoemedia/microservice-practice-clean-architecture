export interface ITokenService {
  generateToken(payload: object, expiresIn?: string): string;
  verifyToken(token: string): any; // You can type this more strictly if you wish
}
