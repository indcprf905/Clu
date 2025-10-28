import { IsString, IsNumber, IsArray, Min, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateListingDto {
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @MinLength(10)
  @MaxLength(100)
  title: string;

  @IsString()
  @MinLength(20)
  @MaxLength(300)
  summary: string;

  @IsString()
  @MinLength(50)
  description?: string;

  @IsNumber()
  @Min(50)
  price: number;

  @IsNumber()
  @Min(1)
  deliveryDays: number;

  @IsArray()
  @IsString({ each: true })
  samples: string[]; // At least 1 sample required
}
