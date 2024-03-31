import path from "node:path";
import { URL } from "node:url"; // in Browser, the URL in native accessible on window

const __filename = new URL("", import.meta.url).pathname;
export const ROOT_DIR = path.dirname(path.resolve(__filename, "../"));

export enum ExitCodesEnum {
  SUCCESS = 0,
  HANDLED_ERROR = 1,
  UNHANDLED_ERROR = 2,
}
