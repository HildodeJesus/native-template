import { appSchema, tableSchema } from "@nozbe/watermelondb";
import { CommentSchema } from "./comments.schema";
import { PostSchema } from "./post.schema";

export default appSchema({
  version: 1,
  tables: [tableSchema(PostSchema), tableSchema(CommentSchema)],
});
