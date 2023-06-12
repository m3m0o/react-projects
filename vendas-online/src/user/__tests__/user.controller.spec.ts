import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';

import { UserService } from '../user.service';

import { ReturnUserDTO } from '../dtos/returnUser.dto';

import { createUserMock } from '../__mocks__/createUser.mock';
import { userEntityMock } from '../__mocks__/user.mock';
import { usersMock } from '../__mocks__/usersMock';
import { updatePasswordMock } from '../__mocks__/updatePassword.mock';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(userEntityMock),
            updatePassword: jest.fn().mockResolvedValue(userEntityMock),
            getAllUsers: jest.fn().mockResolvedValue(usersMock),
            getUserById: jest
              .fn()
              .mockResolvedValue(new ReturnUserDTO(userEntityMock)),
          },
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  // createUser
  it('should return UserEntity in createUser', async () => {
    const user = await controller.createUser(createUserMock);

    expect(user).toEqual(userEntityMock);
  });

  // updatePassword
  it('should return UserEntity in updatePassword', async () => {
    const user = await controller.updatePassword(
      userEntityMock.id,
      updatePasswordMock,
    );

    expect(user).toEqual(userEntityMock);
  });

  // getAllUsers
  it('should return ReturnUserDTO[] in getAllUsers', async () => {
    const users = controller.getAllUsers();

    expect(users).toEqual(usersMock);
  });

  // getUserById
  it('should return ReturnUserDTO in getUserById', async () => {
    const user = controller.getUserById(userEntityMock.id);

    expect(user).toEqual(new ReturnUserDTO(userEntityMock));
  });
});
