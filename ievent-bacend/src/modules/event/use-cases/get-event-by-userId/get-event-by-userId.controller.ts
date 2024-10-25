import { AuthGuard } from 'src/modules/user/use-cases/auth/auth.guard';
import {
  BadRequestException,
  Controller,
  Get,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetEventsByUserIdUseCase } from './get-event-by-userId.useCase';
import {
  GetEventsByUserIdHeaderDataDTO,
  GetEventsByUserIdDTOResponse,
} from './get-event-by-userId.DTO';
import { GetEventsByUserIdErrors } from './get-event-by-userId.errors';

@ApiTags('Event')
@Controller('api/v1/event/find-by-user-id')
export class GetEventsByUserIdController {
  constructor(private readonly useCase: GetEventsByUserIdUseCase) {}

  @ApiOkResponse({
    description: 'Get event by user id',
    type: GetEventsByUserIdDTOResponse,
  })
  @UseGuards(AuthGuard)
  @Get()
  async getEvent(@Req() headerData: GetEventsByUserIdHeaderDataDTO) {
    const userId = headerData.userId;

    const result = await this.useCase.execute({ userId });
    if (result.isLeft()) {
      const error = result.value;
      if (error.constructor === GetEventsByUserIdErrors.EventNotFound) {
        throw new NotFoundException(error);
      } else {
        throw new BadRequestException(error);
      }
    } else {
      return result.value;
    }
  }
}
