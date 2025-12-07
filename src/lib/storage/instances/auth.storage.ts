import { createMMKV } from "react-native-mmkv";
import type { AuthStorageSchema } from "@/types/storage";
import { TypedStorage } from "../typed-storage";

const mmkv = createMMKV({
  id: `auth-storage`,
  mode: "multi-process",
  readOnly: false,
});

export const authStorage = new TypedStorage<AuthStorageSchema>(mmkv);
