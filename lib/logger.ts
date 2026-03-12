type LogContext = Record<string, unknown>;

const levelColors: Record<string, string> = {
  info: "\x1b[36m",
  warn: "\x1b[33m",
  error: "\x1b[31m",
  debug: "\x1b[35m",
};
const reset = "\x1b[0m";

function formatMessage(level: string, message: string, context?: LogContext): string {
  const timestamp = new Date().toISOString();
  if (process.env.NODE_ENV === "production") {
    return JSON.stringify({
      timestamp,
      level,
      message,
      ...context,
    });
  }
  const color = levelColors[level] ?? "";
  const ctx = context ? ` ${JSON.stringify(context)}` : "";
  return `${color}[${timestamp}] ${level.toUpperCase()} ${message}${ctx}${reset}`;
}

export const log = {
  info(message: string, context?: LogContext) {
    console.log(formatMessage("info", message, context));
  },
  warn(message: string, context?: LogContext) {
    console.warn(formatMessage("warn", message, context));
  },
  error(message: string, error?: Error | unknown, context?: LogContext) {
    const errPayload =
      error instanceof Error
        ? { error: error.message, stack: error.stack }
        : error != null
          ? { error: String(error) }
          : {};
    console.error(formatMessage("error", message, { ...errPayload, ...context }));
  },
  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV === "development") {
      console.debug(formatMessage("debug", message, context));
    }
  },
};
