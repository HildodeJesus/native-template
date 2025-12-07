import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Platform } from "react-native";

import { AppConfig } from "@/lib/config";
import migrations from "./migration";
import { Comment } from "./models/comment";
import { Post } from "./models/post";
import schema from "./schemas";

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
