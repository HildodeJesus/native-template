import { createTable, schemaMigrations } from "@nozbe/watermelondb/Schema/migrations";
import { CommentSchema } from "./schemas/comments.schema";
import { PostSchema } from "./schemas/post.schema";

export default schemaMigrations({
  migrations: [
    {
      toVersion: 1,
      steps: [createTable(PostSchema), createTable(CommentSchema)],
    },
  ],
});
