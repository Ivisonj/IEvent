import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserAccountUseCase } from './create-user-account.useCase';
import { CreateUserAccountErrors } from './create-user-account.errors';
import {
  CreateUserAccountDTO,
  CreateUserAccountDTOResponse,
} from './create-user-account.DTO';

@Controller('api/v1/user/create')
@ApiTags('User')
export class CreateUserController {
  constructor(private readonly useCase: CreateUserAccountUseCase) {}
  @ApiCreatedResponse({
    description: 'create new account',
    type: CreateUserAccountDTOResponse,
  })
  @Post()
  async create(@Body(new ValidationPipe()) bodyData: CreateUserAccountDTO) {
    const result = await this.useCase.execute(bodyData);
    if (result.isLeft()) {
      const error = result.value;
      if (
        error.constructor ===
        CreateUserAccountErrors.UserAccountAlreadyExistsError
      ) {
        throw new ConflictException(error);
      } else {
        throw new BadRequestException(error);
      }
    } else {
      return result;
    }
  }
}
