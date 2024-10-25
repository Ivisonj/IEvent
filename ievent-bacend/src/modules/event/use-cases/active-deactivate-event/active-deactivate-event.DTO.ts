import { ApiProperty } from '@nestjs/swagger';

export class ActiveDeactivateEventHeaderDataDTO {
  @ApiProperty()
  userId: string;
}

export class ActiveDeactivateEventDTOResponse {
  @ApiProperty()
  message: string;
}
