import { SetMetadata } from '@nestjs/common';
import { UserType } from '../enum/user-type.enum';

export const ROLES_KEY = 'roles';
export const UserTypes = (...userTypes: UserType[]) =>
  SetMetadata(ROLES_KEY, userTypes);
