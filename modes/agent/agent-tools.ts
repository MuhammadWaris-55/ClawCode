import { tool } from "ai";
import { z } from "zod";
import type { ToolExecutor } from "./tool-executor";

export function createAgentTools(executor: ToolExecutor) {
  return {
    read_file: tool({
      description:
        "Read a text file from the workspace. Use a path relative to project root.",
      inputSchema: z.object({
        path: z.string().describe("The relative path to the file."),
      }),
      execute: async ({ path: p }) => executor.readFile(p),
    }),
  };
}
