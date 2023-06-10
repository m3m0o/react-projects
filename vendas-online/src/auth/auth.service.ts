import { Injectable, NotFoundException } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { ReturnUserDTO } from '../user/dtos/returnUser.dto';

import { JwtService } from '@nestjs/jwt';

import { LoginDTO } from './dtos/login.dto';
import { LoginPayloadDTO } from './dtos/loginPayload.dto';
import { ReturnLoginDTO } from './dtos/returnLogin.dto';

import { compareStringWithHashedString } from 'src/utils/hashing';

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

    const isPasswordCorrect = await compareStringWithHashedString(
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
