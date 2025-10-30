import type { TableSchemaSpec } from "@nozbe/watermelondb/Schema";

export const PostSchema: TableSchemaSpec = {
  name: "posts",
  columns: [
    { name: "title", type: "string" },
    { name: "subtitle", type: "string", isOptional: true },
    { name: "body", type: "string" },
    { name: "is_pinned", type: "boolean" },
  ],
};
