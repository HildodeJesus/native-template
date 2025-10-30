import type { MMKV } from "react-native-mmkv";

export class TypedStorage<Schema extends Record<string, any>> {
  constructor(private readonly storage: MMKV) {}

  get<Key extends keyof Schema>(key: Key): Schema[Key] | undefined {
    const json = this.storage.getString(key as string);
    if (!json) return undefined;
    try {
      return JSON.parse(json) as Schema[Key];
    } catch {
      return undefined;
    }
  }

  set<Key extends keyof Schema>(key: Key, value: Schema[Key]): void {
    this.storage.set(key as string, JSON.stringify(value));
  }

  remove<Key extends keyof Schema>(key: Key): void {
    this.storage.remove(key as string);
  }

  clear(): void {
    this.storage.clearAll();
  }
}
