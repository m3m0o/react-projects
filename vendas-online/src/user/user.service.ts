import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(
      createUserDTO.password,
      saltOrRounds,
    );

    const newUser = {
      id: this.users.length + 1,
      ...createUserDTO,
      password: hashedPassword,
    };

    this.users.push(newUser);

    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}
