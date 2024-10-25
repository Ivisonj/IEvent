import { ApiProperty } from '@nestjs/swagger';

export class GetUserByNameDTO {
  @ApiProperty()
  name: string;
}

export class GetUserByNameDTOResponse {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
}
