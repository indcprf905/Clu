import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  listingId: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
