import { IsOptional, IsString, IsInt } from 'class-validator';

export class CreateAddressDTO {
  @IsString()
  @IsOptional()
  complement: string;

  @IsInt()
  addressNumber: number;

  @IsString()
  cep: string;

  @IsInt()
  cityId: number;
}
