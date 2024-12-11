import { Config } from "@/config/config";
import { SharedModule } from "./shared-module";
import { ChargerModule } from "./charger-module";

export class App {
  private constructor(
    readonly sharedModule: SharedModule,
    readonly chargerModule: ChargerModule,
  ) {}

  public static create(config: Config): App {
    const sharedModule = SharedModule.create(config);
    const chargerModule = ChargerModule.create(config, sharedModule);
    return new App(sharedModule, chargerModule);
  }
}
