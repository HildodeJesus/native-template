import * as Sentry from "@sentry/react-native";
import { Platform } from "react-native";
import type { LoggerProps, LogKey, LogLevel } from "@/lib/logger/types";

export class Logger {
  private isDev = __DEV__;

  constructor(private props: LoggerProps = {}) {}

  private buildTags(extraTags?: Record<string, string>) {
    return {
      platform: Platform.OS,
      ...(this.props.userId && { userId: this.props.userId }),
      ...this.props.tags,
      ...extraTags,
    };
  }

  /**
   * Se for DEV: Mostra um console limpo e formatado.
   * Se for PROD: Envia para o Sentry com contexto rico.
   */
  log(level: LogLevel, key: LogKey, content: any, extraTags?: Record<string, string>) {
    const tags = this.buildTags(extraTags);
    const data =
      content instanceof Error ? { message: content.message, stack: content.stack } : content;

    // --- LOG PARA DESENVOLVIMENTO ---
    if (this.isDev) {
      const color = level === "error" ? "❌" : level === "warn" ? "⚠️" : "ℹ️";
      console.group(`${color} [${level.toUpperCase()}] ${key}`);
      console.log("Data:", data);
      console.log("Tags:", tags);
      console.groupEnd();
      return;
    }

    // --- LOG PARA PRODUÇÃO (SENTRY) ---
    Sentry.withScope((scope) => {
      scope.setTags(tags);
      scope.setContext("log_details", {
        key,
        timestamp: new Date().toISOString(),
        ...this.props.context,
      });

      if (level === "error" && content instanceof Error) {
        scope.setTag("log_key", key);
        Sentry.captureException(content);
      } else {
        const message = `[${key}] ${typeof content === "string" ? content : "Check context data"}`;

        scope.setExtra("payload", data);

        Sentry.captureMessage(message, {
          level: level as Sentry.SeverityLevel,
        });
      }
    });
  }
  info(key: LogKey, content: any, tags?: Record<string, string>) {
    this.log("info", key, content, tags);
  }

  warn(key: LogKey, content: any, tags?: Record<string, string>) {
    this.log("warn", key, content, tags);
  }

  error(key: LogKey, content: any, tags?: Record<string, string>) {
    this.log("error", key, content, tags);
  }
}

export const logger = new Logger();
