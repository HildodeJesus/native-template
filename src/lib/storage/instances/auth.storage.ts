import { createMMKV } from "react-native-mmkv";
import { AppConfig } from "@/lib/config";
import type { AuthStorageSchema } from "@/types/storage";
import { TypedStorage } from "../typed-storage";

export const mmkv = createMMKV({
  id: `auth-storage`,
  encryptionKey: AppConfig.encryptionKey,
});

export const authStorage = new TypedStorage<AuthStorageSchema>(mmkv);
