import { Injectable, NotFoundException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { ReturnUserDTO } from 'src/user/dtos/returnUser.dto';

import { JwtService } from '@nestjs/jwt';

import { LoginDTO } from './dtos/login.dto';
import { LoginPayloadDTO } from './dtos/loginPayload.dto';
import { ReturnLoginDTO } from './dtos/returnLogin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<ReturnLoginDTO> {
    const user: UserEntity | undefined = await this.userService
      .getUserByEmail(loginDTO.email)
      .catch(() => undefined);

    const isPasswordCorrect = await bcrypt.compare(
      loginDTO.password,
      user?.password || '',
    );

    if (!user || !isPasswordCorrect)
      throw new NotFoundException('Email or password invalid.');

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayloadDTO(user) }),
      user: new ReturnUserDTO(user),
    };
  }
}
