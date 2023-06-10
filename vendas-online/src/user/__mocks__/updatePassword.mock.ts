import { UpdatePasswordDTO } from '../dtos/updatePassword.dto';

export const updatePasswordMock: UpdatePasswordDTO = {
  currentPassword: 'testPassword',
  newPassword: 'testingPassword',
};

export const updatePasswordInvalidMock: UpdatePasswordDTO = {
  currentPassword: 'invalidPassword',
  newPassword: 'testingPassword',
};
