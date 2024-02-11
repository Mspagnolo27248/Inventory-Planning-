import { IApplicationLog } from "./IApplicationLog";

// Define ILogger interface
export interface ILogger {
    log(transaction: IApplicationLog): Promise<boolean>;
  }