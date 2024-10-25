import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Controller,
  NotFoundException,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventDTO } from '../../dtos/event.DTO';
import { ActiveDeactivateEventUseCase } from './active-deactivate-event.useCase';
import { ActiveDeactivateEventErrors } from './active-deactivate-event.errors';
import {
  ActiveDeactivateEventHeaderDataDTO,
  ActiveDeactivateEventDTOResponse,
} from './active-deactivate-event.DTO';
import { AuthGuard } from 'src/modules/user/use-cases/auth/auth.guard';

@ApiTags('Event')
@Controller('api/v1/event/active-deactivate/')
export class ActiveDeactivateEventController {
  constructor(private readonly useCase: ActiveDeactivateEventUseCase) {}

  @ApiOkResponse({
    description: 'Active/deactivate event',
    type: ActiveDeactivateEventDTOResponse,
  })
  @UseGuards(AuthGuard)
  @Patch(':eventId')
  async activeDeactivateEvent(
    @Param('eventId') eventId: string,
    @Req() headerData: ActiveDeactivateEventHeaderDataDTO,
  ) {
    const userId = headerData.userId;
    const result = await this.useCase.execute(eventId, { userId });
    if (result.isLeft()) {
      const error = result.value;
      if (error.constructor === ActiveDeactivateEventErrors.EventNotFound) {
        throw new NotFoundException(error);
      } else {
        throw new BadRequestException(error);
      }
    } else {
      return result.value;
    }
  }
}
