import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";

export class Post extends Model {
  static table = "posts";

  static associations = {
    comments: { type: "has_many", foreignKey: "post_id" } as const,
  };

  @text("title") title!: string;
  @text("body") body!: string;
  @field("is_pinned") isPinned!: boolean;
}
