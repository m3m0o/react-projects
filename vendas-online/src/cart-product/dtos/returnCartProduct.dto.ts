import { CartProductEntity } from '../entities/cartProduct.entity';

import { ReturnCartDTO } from 'src/cart/dtos/returnCart.dto';
import { ReturnProductDTO } from 'src/product/dtos/returnProduct.dto';

export class ReturnCartProductDTO {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
  product?: ReturnProductDTO;
  cart?: ReturnCartDTO;

  constructor(cartProduct: CartProductEntity) {
    this.id = cartProduct.id;
    this.cartId = cartProduct.cartId;
    this.productId = cartProduct.productId;
    this.amount = cartProduct.amount;
    this.product = cartProduct.product
      ? new ReturnProductDTO(cartProduct.product)
      : undefined;
    this.cart = cartProduct.cart
      ? new ReturnCartDTO(cartProduct.cart)
      : undefined;
  }
}
