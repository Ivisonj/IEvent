import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/infra/database/prisma/prisma-service.module';

export interface SignInResponse {
  access_token: string;
  name: string;
  email: string;
}

@Injectable()
export class AuthUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<SignInResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      throw new UnauthorizedException('Credenciais inválidas');

    const payload = { sub: user.id, email: user.email };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token: access_token,
      name: user.name,
      email: user.email,
    };
  }
}
