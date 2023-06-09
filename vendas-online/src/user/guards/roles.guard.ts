import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserType } from '../enum/user-type.enum';

import { ROLES_KEY } from '../../decorators/user-type.decorator';

import { JwtService } from '@nestjs/jwt';

import { LoginPayloadDTO } from 'src/auth/dtos/loginPayload.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const { authorization } = context.switchToHttp().getRequest().headers;

    const loginPayloadDTO: LoginPayloadDTO | undefined = await this.jwtService
      .verifyAsync(authorization, { secret: process.env.JWT_SECRET })
      .catch(() => undefined);

    if (!loginPayloadDTO) return false;

    return requiredRoles.some((role) => role === loginPayloadDTO.typeUser);
  }
}
