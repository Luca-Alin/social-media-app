import type { Gender } from './Gender';

export interface RegisterModel {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
}