import { Config } from "@/config/config";
import { Module } from "./module";
import { Router } from "express";
import { SharedModule } from "./shared-module";

export class ChargerModule implements Module {
  private constructor() {}

  public static create(
    config: Config,
    sharedModule: SharedModule,
  ): ChargerModule {
    return new ChargerModule();
  }

  routes(): Router | null {
    return Router().get("/api/v1/chargers", async (req, res, next) => {});
  }
}
