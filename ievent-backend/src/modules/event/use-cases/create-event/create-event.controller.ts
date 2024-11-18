import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/user/use-cases/auth/auth.guard';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  ValidationPipe,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CreateEventUseCase } from './create-event.useCase';
import {
  CreateEventBodyDataDTO,
  CreateEventDTOResponse,
} from './create-event.DTO';
import { CreateEventErrors } from './create-event.errors';

@Controller('api/v1/event/create')
@ApiTags('Event')
export class CreateEventController {
  constructor(private readonly useCase: CreateEventUseCase) {}
  @ApiCreatedResponse({
    description: 'create new event',
    type: CreateEventDTOResponse,
  })
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Req() headerData,
    @Body(new ValidationPipe()) bodyData: CreateEventBodyDataDTO,
  ) {
    const userId = headerData.userId;
    const dto = { userId, ...bodyData };

    const result = await this.useCase.execute(dto);
    if (result.isLeft()) {
      const error = result.value;
      if (error.constructor === CreateEventErrors.UserNotFound) {
        throw new ConflictException(error);
      } else {
        throw new BadRequestException(error);
      }
    } else {
      return result.value;
    }
  }
}
