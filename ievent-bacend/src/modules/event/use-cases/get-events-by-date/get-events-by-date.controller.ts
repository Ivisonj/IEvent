import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetEventsByDateUseCase } from './get-events-by-date.useCase';
import {
  GetEventByDateDTOResponse,
  GetEventsByDateHeaderDataDTO,
} from './get-events-by-date.DTO';
import { GetEventsByDateErrors } from './get-events-by-date.errors';
import { AuthGuard } from 'src/modules/user/use-cases/auth/auth.guard';

@ApiTags('Event')
@Controller('api/v1/event/find-by-date')
export class GetEventByDateController {
  constructor(private readonly useCase: GetEventsByDateUseCase) {}

  @ApiOkResponse({
    description: 'Get event by date',
    type: GetEventByDateDTOResponse,
  })
  @UseGuards(AuthGuard)
  @Get()
  async getEventsByDate(
    @Req() headerData: GetEventsByDateHeaderDataDTO,
    @Query('date') date: string,
  ) {
    const userId = headerData.userId;

    const result = await this.useCase.execute({ userId }, date);
    if (result.isLeft()) {
      const error = result.value;
      if (error.constructor === GetEventsByDateErrors.UserNotExists) {
        throw new NotFoundException(error);
      } else {
        throw new BadRequestException(error);
      }
    } else {
      return result.value;
    }
  }
}
