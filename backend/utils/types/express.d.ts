// src/utils/types/express.d.ts
import { IUser } from '../../models/userModel';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// Export an empty object to make it a module
export {};