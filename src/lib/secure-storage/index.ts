import type { AuthStorageSchema } from "@/types/storage";
import { TypedSecureStorage } from "./typed-secure-storage";

export const secureStorage = new TypedSecureStorage<AuthStorageSchema>();

export { TypedSecureStorage };

