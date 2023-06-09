import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  id: 1,
  name: 'Guilherme Henrique Violin',
  email: 'email.mock@mail.com',
  password: '$2b$10$8EVZ4VpxQg3szLf150JLJe.KBvND1/s1wx.Ijl42z5qgIRW9BSdUK',
  cpf: '12345678900',
  phone: '14991113926',
  typeUser: UserType.User,
  createdAt: new Date(),
  updatedAt: new Date(),
  addresses: [],
};
