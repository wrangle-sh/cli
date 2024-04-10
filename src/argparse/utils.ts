import fs from "node:fs";
import { ExitCodesEnum } from "@/constants.js";

import { logger } from "@/loggers/program.js";

/**
 * Recursively resolves a file or directory to a list of files.
 * @param fileOrDirectory File or directory to resolve.
 */
function resolveFileOrDirectory(fileOrDirectory: string): string[] {
  if (!fs.existsSync(fileOrDirectory)) {
    logger.error(`File or directory does not exist: ${fileOrDirectory}`);
    process.exit(ExitCodesEnum.HANDLED_ERROR); // TODO: Bubble up errors in a way that lets me print all of them, not just the first we encounter.
  }
  if (fs.statSync(fileOrDirectory).isFile()) {
    return [fileOrDirectory];
  }
  return fs.readdirSync(fileOrDirectory).flatMap((file) => {
    return resolveFileOrDirectory(`${fileOrDirectory}/${file}`);
  });
}

/**
 * Resolves the user-provided list of files and directories to a flat list of files.
 * Accounts for cases like users that might provide a file as well as a directory that contains that exact file. We don't want to analyze the same file twice, after all.
 * @param filesAndDirectories A list of files and/or directories to resolve.
 */
export function resolveFilesAndDirectoriesToFiles(
  filesAndDirectories: string[],
): string[] {
  const files: string[] = [];
  for (const fileOrDirectory of filesAndDirectories) {
    if (!fs.existsSync(fileOrDirectory)) {
      logger.error(`File or directory does not exist: ${fileOrDirectory}`);
      process.exit(ExitCodesEnum.HANDLED_ERROR);
    }
    files.push(...resolveFileOrDirectory(fileOrDirectory));
  }
  return Array.from(new Set(files)); // wipe duplicates
}
