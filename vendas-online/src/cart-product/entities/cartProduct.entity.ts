import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ProductEntity } from '../../product/entities/product.entity';
import { CartEntity } from '../../cart/entities/cart.entity';

@Entity({ name: 'cart_product' })
export class CartProductEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'cart_id', nullable: false })
  cartId: number;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ name: 'amount', nullable: false })
  amount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => ProductEntity,
    (productEntity: ProductEntity) => productEntity.cartsProduct,
  )
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: ProductEntity;

  @ManyToOne(
    () => CartEntity,
    (cartEntity: CartEntity) => cartEntity.cartProducts,
  )
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart?: CartEntity;
}
