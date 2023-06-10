import { IsNumber } from 'class-validator';

export class InsertProductInCartDTO {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;
}
