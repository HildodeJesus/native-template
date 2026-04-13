import { createMMKV } from "react-native-mmkv";
import type { AuthStorageSchema } from "@/types/storage";
import { TypedStorage } from "../typed-storage";
import { appConfig } from "@/lib/config";

const mmkv = createMMKV({
  id: `auth-storage`,
  mode: "multi-process",
  readOnly: false,
  encryptionKey: appConfig.encryptionKey

});

export const authStorage = new TypedStorage<AuthStorageSchema>(mmkv);
