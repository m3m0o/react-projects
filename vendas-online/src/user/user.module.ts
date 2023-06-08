import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.interface';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
