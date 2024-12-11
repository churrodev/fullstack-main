import { Logger } from "@/modules/shared/domain/logger";

export class ConsoleLogger implements Logger {
  error(message: string, extra?: Record<string, unknown>): void {
    const props: unknown[] = [`[${new Date().toISOString()}] ${message}`];
    if (extra) {
      props.push(extra);
    }
    console.error(...props);
  }

  warn(message: string, extra?: Record<string, unknown>): void {
    const props: unknown[] = [`[${new Date().toISOString()}] ${message}`];
    if (extra) {
      props.push(extra);
    }
    console.warn(...props);
  }

  info(message: string, extra?: Record<string, unknown>): void {
    const props: unknown[] = [`[${new Date().toISOString()}] ${message}`];
    if (extra) {
      props.push(extra);
    }
    console.log(...props);
  }
}
