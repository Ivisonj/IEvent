import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { GetUserByNameUseCase } from './get-user-by-name.useCase';
import {
  GetUserByNameDTO,
  GetUserByNameDTOResponse,
} from './get-user-by-name.DTO';
import { GetUserByNameErrors } from './get-user-by-name.Errors';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('User')
@Controller('api/v1/user/find-by-name')
export class GetUserByNameController {
  constructor(private readonly useCase: GetUserByNameUseCase) {}

  @ApiOkResponse({
    description: 'Get user by name',
    type: GetUserByNameDTOResponse,
  })
  @UseGuards(AuthGuard)
  @Get(':name')
  async getUserByName(@Param() paramData: GetUserByNameDTO) {
    const result = await this.useCase.execute(paramData);
    if (result.isLeft()) {
      const error = result.value;
      if (error.constructor === GetUserByNameErrors.UserNotFound) {
        throw new NotFoundException(Error);
      } else {
        throw new BadRequestException(error);
      }
    } else {
      return result.value;
    }
  }
}
