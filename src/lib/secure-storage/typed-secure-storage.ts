import * as Keychain from "react-native-keychain";

type SecureStorageGetOptions = Omit<Keychain.GetOptions, "service">;
type SecureStorageSetOptions = Omit<Keychain.SetOptions, "service">;
type SecureStorageRemoveOptions = Omit<Keychain.BaseOptions, "service">;

export class TypedSecureStorage<Schema extends object> {
  async get<Key extends keyof Schema>(
    key: Key,
    options?: SecureStorageGetOptions,
  ): Promise<Schema[Key] | undefined> {
    const credentials = await Keychain.getGenericPassword({
      ...options,
      service: this.getService(key),
    });

    if (!credentials) return undefined;

    try {
      return JSON.parse(credentials.password) as Schema[Key];
    } catch {
      return undefined;
    }
  }

  async set<Key extends keyof Schema>(
    key: Key,
    value: Schema[Key],
    options?: SecureStorageSetOptions,
  ): Promise<void> {
    await Keychain.setGenericPassword(String(key), JSON.stringify(value), {
      ...options,
      service: this.getService(key),
    });
  }

  async remove<Key extends keyof Schema>(
    key: Key,
    options?: SecureStorageRemoveOptions,
  ): Promise<void> {
    await Keychain.resetGenericPassword({
      ...options,
      service: this.getService(key),
    });
  }

  private getService<Key extends keyof Schema>(key: Key) {
    return String(key);
  }
}
