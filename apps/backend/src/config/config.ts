import { cleanEnv, num } from "envalid";

const config = {
  APP_PORT: num(),
};

export const loadConfig = () => cleanEnv(process.env, config);

export type Config = ReturnType<typeof loadConfig>;
