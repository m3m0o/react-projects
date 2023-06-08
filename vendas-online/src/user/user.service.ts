import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';

import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(
      createUserDTO.password,
      saltOrRounds,
    );

    const newUser = {
      ...createUserDTO,
      password: hashedPassword,
      typeUser: 1,
    };

    return this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
