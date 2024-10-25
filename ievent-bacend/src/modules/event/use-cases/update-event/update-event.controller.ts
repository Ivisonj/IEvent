import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateEventUseCase } from './update-event.useCase';
import {
  UpdateEventBodyDataDTO,
  UpdateEventHeaderDataDTO,
  UpdateEventDTOResponse,
} from './update-event.DTO';
import { UpdateEventErrors } from './update-event.errors';

@ApiTags('Event')
@Controller('api/v1/event/update/')
export class UpdateEventController {
  constructor(private readonly useCase: UpdateEventUseCase) {}

  @ApiOkResponse({
    description: 'Update Event',
    type: UpdateEventDTOResponse,
  })
  @Patch(':eventId')
  async updateEvent(
    @Param('eventId') eventId: string,
    @Req() headerData: UpdateEventHeaderDataDTO,
    @Body() bodyData: UpdateEventBodyDataDTO,
  ) {
    const userId = headerData.userId;
    const result = await this.useCase.execute(eventId, { userId }, bodyData);

    if (result.isLeft()) {
      const error = result.value;
      console.log(error);
      if (error.constructor === UpdateEventErrors.EventNotFound) {
        throw new NotFoundException(error);
      } else {
        throw new BadRequestException(error);
      }
    } else {
      return result.value;
    }
  }
}
