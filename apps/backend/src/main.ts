import "dotenv/config";
import express from "express";
import cors from "cors";
import { loadConfig } from "@/config/config";
import { parseError } from "@/pkg/error/parse-error";
import { App } from "./di/app";

async function main() {
  const config = loadConfig();
  const expressApp = express().use(cors()).use(express.json());

  const app = App.create(config);

  expressApp.listen(config.APP_PORT);

  // server should wait for exit

  app.sharedModule.logger.info("exiting server");
}

main().catch((error) => {
  console.error("main exited with error", { error: parseError(error) });
  process.exit(1);
});
