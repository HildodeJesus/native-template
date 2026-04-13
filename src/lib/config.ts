import Constants from "expo-constants";
import type configApp from "../../app.config";
import { z } from "zod";

type InternalConfigType = (typeof configApp)["expo"]["extra"]["internal"];

const internalConfig: InternalConfigType =
  Constants.expoConfig?.extra?.internal ?? {};

const configSchema = z.object({
  encryptionKey: z.string(),
  env: z.enum(["development", "production"]),
  databaseName: z.string(),
  sentryAuthToken: z.string().optional(),
  sentryAuthUrl: z.string().optional(),
  baseApiUrl: z.string().optional(),
});

export const appConfig = configSchema.parse(internalConfig);
