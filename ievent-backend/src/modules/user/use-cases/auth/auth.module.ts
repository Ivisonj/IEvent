import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthUseCase } from './auth.useCase';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/shared/infra/database/prisma/prisma-service.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '720h' },
    }),
  ],
  providers: [AuthUseCase, PrismaService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthUseCase, AuthGuard],
})
export class AuthModule {}
