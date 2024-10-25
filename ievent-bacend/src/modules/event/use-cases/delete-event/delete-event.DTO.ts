import { ApiProperty } from '@nestjs/swagger';

export class DeleEventHeaderDataDTO {
  @ApiProperty()
  userId: string;
}

export class DeleteEventDTOResponse {
  @ApiProperty()
  message: string;
}
