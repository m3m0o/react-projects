import { Controller } from '@nestjs/common';

import { UserTypes } from 'src/decorators/user-type.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

@UserTypes(UserType.User)
@Controller('cart')
export class CartController {}
