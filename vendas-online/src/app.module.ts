import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';

import { UserModule } from './user/user.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { CacheModule } from './cache/cache.module';

import { UserEntity } from './user/entities/user.entity';
import { StateEntity } from './state/entities/state.entity';
import { CityEntity } from './city/entities/city.entity';
import { AddressEntity } from './address/entities/address.entity';
import { CategoryEntity } from './category/entities/category.entity';
import { ProductEntity } from './product/entities/product.entity';
import { CartEntity } from './cart/entities/cart.entity';
import { PaymentEntity } from './payment/entities/payment.entity';
import { PaymentStatusEntity } from './payment-status/entities/payment-status.entity';
import { PaymentPixEntity } from './payment/entities/payment-pix.entity';
import { PaymentCreditCardEntity } from './payment/entities/payment-credit-card.entity';
import { OrderEntity } from './order/entities/order.entity';
import { OrderProductEntity } from './order-product/entities/order-product.entity';

import { AuthModule } from './auth/auth.module';

import { RolesGuard } from './user/guards/roles.guard';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CartProductModule } from './cart-product/cart-product.module';
import { CartProductEntity } from './cart-product/entities/cartProduct.entity';
import { PaymentStatusModule } from './payment-status/payment-status.module';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order-product/order-product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      entities: [
        UserEntity,
        StateEntity,
        CityEntity,
        AddressEntity,
        CategoryEntity,
        ProductEntity,
        CartEntity,
        CartProductEntity,
        PaymentEntity,
        PaymentPixEntity,
        PaymentCreditCardEntity,
        PaymentStatusEntity,
        OrderEntity,
        OrderProductEntity,
      ],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
    AuthModule,
    JwtModule,
    CategoryModule,
    ProductModule,
    CartModule,
    CartProductModule,
    PaymentStatusModule,
    PaymentModule,
    OrderModule,
    OrderProductModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
