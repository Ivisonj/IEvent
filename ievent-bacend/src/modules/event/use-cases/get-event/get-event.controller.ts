import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GetEventUseCase } from './get-event.useCase';
import { GetEventError } from './get-event.errors';
import { GetEventDTOResponse, GetEventHeaderDataDTO } from './get-event.DTO';
import { AuthGuard } from 'src/modules/user/use-cases/auth/auth.guard';

@ApiTags('Event')
@Controller('api/v1/event/')
export class GetEventController {
  constructor(private readonly useCase: GetEventUseCase) {}

  @ApiOkResponse({
    description: 'Get event by id',
    type: GetEventDTOResponse,
  })
  @UseGuards(AuthGuard)
  @Get(':eventId')
  async getEvent(
    @Param('eventId') eventId: string,
    @Req() headerData: GetEventHeaderDataDTO,
  ) {
    const userId = headerData.userId;
    const result = await this.useCase.execute(eventId, { userId });
    if (result.isLeft()) {
      const error = result.value;
      if (error.constructor === GetEventError.EventNotFound) {
        throw new NotFoundException(error);
      } else {
        throw new BadRequestException(error);
      }
    } else {
      return result.value;
    }
  }
}
