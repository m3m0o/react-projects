import { CartEntity } from '../entities/cart.entity';

import { ReturnCartProductDTO } from '../../cart-product/dtos/returnCartProduct.dto';

export class ReturnCartDTO {
  id: number;
  cartProducts?: ReturnCartProductDTO[];

  constructor(cart: CartEntity) {
    this.id = cart.id;
    this.cartProducts = cart.cartProducts
      ? cart.cartProducts.map(
          (cartProduct) => new ReturnCartProductDTO(cartProduct),
        )
      : undefined;
  }
}
