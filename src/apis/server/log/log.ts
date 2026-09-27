import Logger from "@core/utils/logger";
import { LogPayload } from "./interface";

export const createLog = async (_token: string, _payload: LogPayload): Promise<void> => {
  Logger.info("createLog: logAPI chưa được cấu hình");
};
