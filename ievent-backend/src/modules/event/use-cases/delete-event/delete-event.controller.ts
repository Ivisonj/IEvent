import {
  BadRequestException,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DeteleEventUseCase } from './delete-event.useCase';
import {
  DeleteEventDTOResponse,
  DeleEventHeaderDataDTO,
} from './delete-event.DTO';
import { DeleteEventError } from './delete-event.errors';
import { AuthGuard } from 'src/modules/user/use-cases/auth/auth.guard';

@ApiTags('Event')
@Controller('api/v1/event/delete')
export class DeleteEventController {
  constructor(private readonly useCase: DeteleEventUseCase) {}

  @ApiOkResponse({
    description: 'Delete event',
    type: DeleteEventDTOResponse,
  })
  @UseGuards(AuthGuard)
  @Delete(':eventId')
  async deleteEvent(
    @Param('eventId') eventId: string,
    @Req() headerData: DeleEventHeaderDataDTO,
  ) {
    const userId = headerData.userId;
    const result = await this.useCase.execute(eventId, { userId });
    if (result.isLeft()) {
      const error = result.value;
      if (error.constructor === DeleteEventError.EventNotFound) {
        throw new NotFoundException(error.message);
      } else {
        throw new BadRequestException(error.message);
      }
    } else {
      return result.value;
    }
  }
}
