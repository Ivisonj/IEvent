import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma/prisma-service.module';
import { CreateUserController } from './use-cases/create-user-account/create-user-account.controller';
import { IUserRepository } from './repositories/user-repository.interface';
import { PgUserRepository } from './repositories/postgres/pg-user.repository';
import { CreateUserAccountUseCase } from './use-cases/create-user-account/create-user-account.useCase';
import { CRYPTO_PROVIDER } from './use-cases/create-user-account/create-user-account.useCase';
import PasswordCrypto from 'src/shared/infra/gateways/bcrypt';
import { GetUserByNameController } from './use-cases/get-user-by-name/get-user-by-name.controller';
import { GetUserByNameUseCase } from './use-cases/get-user-by-name/get-user-by-name.useCase';
import { GetUserUseCase } from './use-cases/get-user/get-user.useCase';
import { GetUserController } from './use-cases/get-user/get-user.controller';

@Module({
  controllers: [
    CreateUserController,
    GetUserByNameController,
    GetUserController,
  ],
  providers: [
    PrismaService,
    CreateUserAccountUseCase,
    GetUserByNameUseCase,
    GetUserUseCase,
    {
      provide: IUserRepository,
      useClass: PgUserRepository,
    },
    {
      provide: CRYPTO_PROVIDER,
      useClass: PasswordCrypto,
    },
  ],
  exports: [IUserRepository],
})
export class UserModule {}
