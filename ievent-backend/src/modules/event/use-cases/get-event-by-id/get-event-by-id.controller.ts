import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetEventByIdUseCase } from './get-event-by-id.useCase';
import {
  GetEventByIdDTOResponse,
  GetEventByIdHeaderDataDTO,
} from './get-event-by-id.DTO';
import { GetEventByIdError } from './get-event-by-id.errors';
import { AuthGuard } from 'src/modules/user/use-cases/auth/auth.guard';

@ApiTags('Event')
@Controller('api/v1/event/find-by-id')
export class GetEventByIdController {
  constructor(private readonly useCase: GetEventByIdUseCase) {}

  @ApiOkResponse({
    description: 'Get event by id',
    type: GetEventByIdDTOResponse,
  })
  @UseGuards(AuthGuard)
  @Get(':eventId')
  async getEventById(
    @Param('eventId') eventId: string,
    @Req() headerData: GetEventByIdHeaderDataDTO,
  ) {
    const userId = headerData.userId;
    const result = await this.useCase.execute(eventId, { userId });
    if (result.isLeft()) {
      const error = result.value;
      if (error.constructor === GetEventByIdError.EventNotFound) {
        throw new NotFoundException(error);
      } else {
        throw new BadRequestException(error);
      }
    } else {
      return result.value;
    }
  }
}
