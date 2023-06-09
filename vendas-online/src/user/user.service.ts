import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';

import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const user = await this.getUserByEmail(createUserDTO.email).catch(
      () => undefined,
    );

    if (user) throw new BadRequestException('Email already registered.');

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

  async getUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException(`user with id ${userId} not found.`);

    return user;
  }

  async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundException(`email not found.`);

    return user;
  }
}
