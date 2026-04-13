export type LogLevel = "error" | "warn" | "info";

export type LogKey = `${string}:${string}:${string}` | `${string}:${string}`;

export type LoggerProps = {
  userId?: string;
  tags?: Record<string, string>;
  context?: Record<string, any>;
};
