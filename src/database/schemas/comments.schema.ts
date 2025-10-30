import type { TableSchemaSpec } from "@nozbe/watermelondb/Schema";

export const CommentSchema: TableSchemaSpec = {
  name: "comments",
  columns: [
    { name: "body", type: "string" },
    { name: "post_id", type: "string", isIndexed: true },
  ],
};
