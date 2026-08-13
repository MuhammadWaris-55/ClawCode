#!/usr/bin/env bun
// Shebang: tells the OS to run this file using bun (found via PATH), so it works as a standalone CLI executable
// this line tells the computer to run this file using bun

import { Command } from "commander";
import { runWakeup } from "./tui/wakeup";

const program = new Command();

program
  .name("clawcode-build")
  .description("A  command-line tool for building ClawCode project")
  .version("0.0.1");

program
  .command("wakeup")
  .description("Wake up ClawCode and pick cli or telegram mode")
  .action(async () => {
     await runWakeup()
  });

await program.parseAsync(process.argv);
