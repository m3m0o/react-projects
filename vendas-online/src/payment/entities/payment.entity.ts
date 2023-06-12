import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  TableInheritance,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { PaymentStatusEntity } from '../../payment-status/entities/payment-status.entity';
import { OrderEntity } from '../../order/entities/order.entity';

@Entity({ name: 'payment' })
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export abstract class PaymentEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'status_id', nullable: false })
  statusId: number;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'discount', nullable: false })
  discount: number;

  @Column({ name: 'final_price', nullable: false })
  finalPrice: number;

  @Column({ name: 'type', nullable: false })
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => OrderEntity, (order) => order.payment)
  orders?: OrderEntity[];

  @ManyToOne(() => PaymentStatusEntity, (payment) => payment.payments)
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  paymentStatus?: PaymentStatusEntity;

  constructor(
    statusId: number,
    price: number,
    discount: number,
    finalPrice: number,
  ) {
    this.statusId = statusId;
    this.price = price;
    this.discount = discount;
    this.finalPrice = finalPrice;
  }
}
