import { IsString, IsNumber, IsArray, Min, MinLength, MaxLength, IsOptional, IsEnum } from 'class-validator';

export enum ListingStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  REJECTED = 'REJECTED',
}

export class UpdateListingDto {
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  @IsOptional()
  title?: string;

  @IsString()
  @MinLength(20)
  @MaxLength(300)
  @IsOptional()
  summary?: string;

  @IsString()
  @MinLength(50)
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(50)
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  deliveryDays?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  samples?: string[];

  @IsEnum(ListingStatus)
  @IsOptional()
  status?: ListingStatus;
}
