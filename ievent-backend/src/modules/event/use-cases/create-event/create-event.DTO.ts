import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEventBodyDataDTO {
  @ApiProperty()
  userId?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1000)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  once: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  recurrence?: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  custom_rules: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  tolerance_time?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  absences_limit?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  late_limit?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  end_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  start_time: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  end_time: Date;
}

export class CreateEventDTOResponse {
  @ApiProperty()
  message: string;
}
