import Constants from "expo-constants";
import type configApp from "../../app.config";

const extra = Constants.expoConfig?.extra ?? {};

export const AppConfig: (typeof configApp)["expo"]["extra"] = {
  encryptionKey: extra.encryptionKey || "fallback-key",
  env: extra.env || "development",
  databaseName: extra.databaseName,
};
