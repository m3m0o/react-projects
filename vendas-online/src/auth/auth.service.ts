import { Injectable, NotFoundException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDTO } from './dtos/login.dto';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDTO: LoginDTO): Promise<UserEntity> {
    const user: UserEntity | undefined = await this.userService
      .getUserByEmail(loginDTO.email)
      .catch(() => undefined);

    const isPasswordCorrect = await bcrypt.compare(
      loginDTO.password,
      user?.password || '',
    );

    if (!user || !isPasswordCorrect)
      throw new NotFoundException('Email or password invalid.');

    return user;
  }
}
