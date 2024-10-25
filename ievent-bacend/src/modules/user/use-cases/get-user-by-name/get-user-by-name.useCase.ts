import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/shared/application/Either';
import { GetUserByNameErrors } from './get-user-by-name.Errors';
import { IUserRepository } from '../../repositories/user-repository.interface';
import {
  GetUserByNameDTO,
  GetUserByNameDTOResponse,
} from './get-user-by-name.DTO';

export type GetUserByNameResponse = Either<
  GetUserByNameErrors.UserNotFound | Error,
  GetUserByNameDTOResponse[]
>;

@Injectable()
export class GetUserByNameUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(
    paramData: GetUserByNameDTO,
  ): Promise<GetUserByNameResponse> {
    const userExists = await this.userRepository.findUserByName(paramData.name);

    if (!userExists) return left(new GetUserByNameErrors.UserNotFound());

    const user: GetUserByNameDTOResponse[] = userExists.map((u) => {
      return {
        name: u.name,
        email: u.email,
      };
    });

    return right(user);
  }
}
