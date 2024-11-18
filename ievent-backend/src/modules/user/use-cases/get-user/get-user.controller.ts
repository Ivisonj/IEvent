import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GetUserUseCase } from './get-user.useCase';
import { GetUserDTOResponse, GetUserHeaderDataDTO } from './get-user.DTO';
import { GetUserErrors } from './get-user.errors';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('User')
@Controller('api/v1/user/')
export class GetUserController {
  constructor(private readonly useCase: GetUserUseCase) {}

  @ApiOkResponse({
    description: 'Get user',
    type: GetUserDTOResponse,
  })
  @UseGuards(AuthGuard)
  @Get()
  async getUser(@Req() headerData: GetUserHeaderDataDTO) {
    const userId = headerData.userId;
    const result = await this.useCase.execute({ userId });
    if (result.isLeft()) {
      const error = result.value;
      if (error.constructor === GetUserErrors.UserNotFound) {
        throw new NotFoundException(Error);
      } else {
        throw new BadRequestException(error);
      }
    } else {
      return result.value;
    }
  }
}
