import type { IUser } from "./user";

export interface AuthStorageSchema {
  token: string;
  user: IUser;
}
