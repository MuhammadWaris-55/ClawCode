import fs from "node:fs";
import path from "node:path";
import { homedir } from "node:os";
import { spawnSync } from "node:child_process";
import type { AgentConfig, ActionLog } from "./types";
import { ActionTracker } from "./action-tracker";

// Only files with these extensions are treated as readable text
const TEXT_EXT = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".mdx",
  ".css",
  ".html",
  ".yml",
  ".yaml",
  ".toml",
  ".txt",
]);

function isProbablyTextFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  // no extension is also allowed (e.g. "README", "Dockerfile")
  return TEXT_EXT.has(ext) || ext === "";
}

// This is a bridge between ai tools and real file system
export class ToolExecutor {
  // in-memory changes not yet written to disk
  private overlay = new Map<string, string>();
  // paths marked as deleted but not yet removed from disk
  private deleted = new Set<string>();
  // makes paths look the same on Windows and Mac/Linux (always use "/")
  private readonly norm = (rel: string) =>
    path.posix.normalize(rel.split(path.sep).join("/")).replace(/^\.\//, "");

  constructor(
    private readonly config: AgentConfig,
    private readonly tracker: ActionTracker,
  ) {}

  // turns a short path into a full path, and blocks it from escaping the project folder
  private resolveSafe(rel: string): string {
    const abs = path.resolve(this.config.codebasePath, rel);
    const root = path.resolve(this.config.codebasePath);
    const relCheck = path.relative(root, abs);
    if (relCheck.startsWith("..") || path.isAbsolute(relCheck)) {
      throw new Error(`Path escapes workspace: ${rel}`);
    }
    return abs;
  }
}
