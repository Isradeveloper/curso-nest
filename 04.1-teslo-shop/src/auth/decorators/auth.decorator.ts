import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    // SetMetadata(META_ROLES, roles),
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
    ApiBearerAuth(),
  );
}
