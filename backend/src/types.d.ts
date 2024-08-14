// backend/src/types.d.ts
import { IUser } from './models/User'; // Adjust the import path as necessary
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser; // Assuming IUser is the interface for the User model
  }
}
