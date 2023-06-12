import { ReturnUserDTO } from '../dtos/returnUser.dto';

import { userEntityMock } from './user.mock';

export const usersMock: ReturnUserDTO[] = [new ReturnUserDTO(userEntityMock)];
