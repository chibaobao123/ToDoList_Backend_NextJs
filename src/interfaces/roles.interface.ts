import { Request } from 'express';
import { Role } from '../roles/roles.enum';

export interface RequestWithUser extends Request {
  user: {
    id: string;
    role: Role;
  };
}
