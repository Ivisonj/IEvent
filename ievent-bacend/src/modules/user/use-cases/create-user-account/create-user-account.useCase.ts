import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/user';
import { IUserRepository } from '../../repositories/user-repository.interface';
import { CreateUserAccountErrors } from './create-user-account.errors';
import { Either, left, right } from 'src/shared/application/Either';
import { CreateUserAccountDTO } from './create-user-account.DTO';
import CryptoProvider from 'src/shared/application/domain/cryptoProvider';

export const CRYPTO_PROVIDER = 'CRYPTO_PROVIDER';

export type CreateUserAccountResponse = Either<
  CreateUserAccountErrors.UserAccountAlreadyExistsError | Error,
  any
>;

@Injectable()
export class CreateUserAccountUseCase {
  constructor(
    private readonly userAccountRepository: IUserRepository,
    @Inject(CRYPTO_PROVIDER) private readonly cryptoProvider: CryptoProvider,
  ) {}

  public async execute(
    bodyData: CreateUserAccountDTO,
  ): Promise<CreateUserAccountResponse> {
    const accountExists = await this.userAccountRepository.findUserByEmail(
      bodyData.email,
    );

    const encryptPassword = this.cryptoProvider.encrypt(bodyData.password);

    if (accountExists)
      return left(new CreateUserAccountErrors.UserAccountAlreadyExistsError());

    const userAccountOrError = User.create({
      name: bodyData.name,
      email: bodyData.email,
      password: encryptPassword,
    });

    await this.userAccountRepository.createUser(userAccountOrError);

    return right({ message: 'Usuário criado com sucesso!' });
  }
}
