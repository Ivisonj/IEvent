import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateEventHeaderDataDTO {
  @ApiProperty()
  userId: string;
}

export class UpdateEventDTOResponse {
  @ApiProperty()
  message: string;
}

export class UpdateEventBodyDataDTO {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name?: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  description?: string;

  @ApiProperty()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsBoolean()
  isPublic?: boolean;

  @ApiProperty()
  @IsBoolean()
  once?: boolean;

  @ApiProperty()
  @IsArray()
  recurrence?: number[];

  @ApiProperty()
  @IsBoolean()
  custom_rules?: boolean;

  @ApiProperty()
  @IsInt()
  tolerance_time?: number;

  @ApiProperty()
  @IsInt()
  absences_limit?: number;

  @ApiProperty()
  @IsInt()
  late_limit?: number;

  @ApiProperty()
  @IsString()
  start_date?: string | Date;

  @ApiProperty()
  @IsString()
  end_date?: string | Date;

  @ApiProperty()
  @IsString()
  start_time?: string | Date;

  @ApiProperty()
  @IsString()
  end_time?: string | Date;

  @ApiProperty()
  @IsString()
  next_event_date?: string | Date;
}
