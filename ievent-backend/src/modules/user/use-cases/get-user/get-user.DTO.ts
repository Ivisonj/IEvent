import { ApiProperty } from '@nestjs/swagger';

export class GetUserHeaderDataDTO {
  @ApiProperty()
  userId: string;
}

export class GetUserDTOResponse {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
}
