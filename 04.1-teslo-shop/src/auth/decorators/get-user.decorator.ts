/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

import { Request } from 'express';
export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  const user = req.user;

  if (!user) throw new InternalServerErrorException('User not found (request)');

  if (data) {
    if (Array.isArray(data)) {
      return data.map((key) => {
        return { [key]: user[key] };
      });
    } else {
      return user[data];
    }
  }

  return user;
});
