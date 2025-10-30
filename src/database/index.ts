import { Platform } from "react-native";
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { AppConfig } from "@/lib/config";
import schema from "./schemas";
import migrations from "./migration";
import { Post } from "./models/post";
import { Comment } from "./models/comment";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: AppConfig.databaseName,
  jsi: Platform.OS === "ios",
  onSetUpError: (error) => {
    console.error("Erro ao configurar o banco de dados:", error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Post, Comment],
});
