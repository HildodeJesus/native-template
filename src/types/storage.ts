import type { Languages } from "../locales";
import type { IUser } from "./user";

export interface AuthStorageSchema {
  token: string;
  user: IUser;
}

export interface GeneralStorageSchema {
  language: Languages;
}
