import { Module } from "@/di/module";
import { Logger } from "@/modules/shared/domain/logger";
import { Config } from "@/config/config";
import { ConsoleLogger } from "@/modules/shared/infrastructure/console-logger";
import { Router } from "express";

export class SharedModule implements Module {
  private constructor(readonly logger: Logger) {}

  public static create(config: Config): SharedModule {
    const logger = new ConsoleLogger();
    return new SharedModule(logger);
  }

  routes(): Router | null {
    return null;
  }
}
