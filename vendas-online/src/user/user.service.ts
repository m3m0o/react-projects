import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';

import { CreateUserDTO } from './dtos/createUser.dto';
import { UpdatePasswordDTO } from './dtos/updatePassword.dto';

import { UserEntity } from './entities/user.entity';

import { hashString, compareStringWithHashedString } from '../utils/hashing';

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

    const hashedPassword = await hashString(createUserDTO.password);

    const newUser = {
      ...createUserDTO,
      password: hashedPassword,
      typeUser: 1,
    };

    return this.userRepository.save(newUser);
  }

  async updatePassword(
    updatePasswordDTO: UpdatePasswordDTO,
    userId: number,
  ): Promise<UserEntity> {
    const user = await this.getUserById(userId);

    const isEnteredCurrentPasswordCorret = await compareStringWithHashedString(
      updatePasswordDTO.currentPassword,
      user.password || '',
    );

    if (!isEnteredCurrentPasswordCorret)
      throw new UnauthorizedException('Invalid current password.');

    const hashedNewPassword = await hashString(updatePasswordDTO.newPassword);

    return this.userRepository.save({
      ...user,
      password: hashedNewPassword,
    });
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
