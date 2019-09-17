import { User } from 'firebase';
export interface User extends User {
  nickName?: string;
}
