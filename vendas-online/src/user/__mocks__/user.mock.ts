import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  id: 1,
  name: 'Guilherme Henrique Violin',
  email: 'email.mock@mail.com',
  password: 'testingPassword',
  cpf: '12345678900',
  phone: '14991113926',
  typeUser: UserType.User,
  createdAt: new Date(),
  updatedAt: new Date(),
  addresses: [],
};
