import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsString({ each: true })
  sizes: string[];

  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  images?: string[];
}
