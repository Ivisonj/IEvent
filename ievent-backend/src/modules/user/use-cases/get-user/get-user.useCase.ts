import { Injectable } from '@nestjs/common';
import { GetUserHeaderDataDTO, GetUserDTOResponse } from './get-user.DTO';
import { IUserRepository } from '../../repositories/user-repository.interface';
import { Either, left, right } from 'src/shared/application/Either';
import { GetUserErrors } from './get-user.errors';

export type GetUserResponse = Either<
  GetUserErrors.UserNotFound | Error,
  GetUserDTOResponse
>;

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(
    headerData: GetUserHeaderDataDTO,
  ): Promise<GetUserResponse> {
    const findUser = await this.userRepository.findUserByUserId(
      headerData.userId,
    );

    if (!findUser) return left(new GetUserErrors.UserNotFound());

    const user: GetUserDTOResponse = {
      name: findUser.name,
      email: findUser.email,
    };

    return right(user);
  }
}
