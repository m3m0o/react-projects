import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { authorizationToLoginPayload } from '../utils/base-64-converter';

export const UserId = createParamDecorator((_, context: ExecutionContext) => {
  const { authorization } = context.switchToHttp().getRequest().headers;

  const loginPayload = authorizationToLoginPayload(authorization);

  return loginPayload?.id;
});
