import { appSchema, tableSchema } from "@nozbe/watermelondb";
import { PostSchema } from "./post.schema";
import { CommentSchema } from "./comments.schema";

export default appSchema({
  version: 1,
  tables: [tableSchema(PostSchema), tableSchema(CommentSchema)],
});
