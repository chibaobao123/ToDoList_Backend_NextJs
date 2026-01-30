import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum';

export const ROLES_KEY = process.env.ROLES_KEY_SECRET;
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
