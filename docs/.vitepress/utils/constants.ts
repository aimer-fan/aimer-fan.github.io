import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const projectRootPath = resolve(__dirname, "../../");
