import { ReturnUserDTO } from '../../user/dtos/returnUser.dto';
import { ReturnLoginDTO } from '../dtos/returnLogin.dto';

import { jwtMock } from './jwt.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';

export const ReturnLoginMock: ReturnLoginDTO = {
  accessToken: jwtMock,
  user: new ReturnUserDTO(userEntityMock),
};
