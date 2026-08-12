#!/usr/bin/env bun

import { Command } from "commander";

const program = new Command();

program
  .name("clawcode-build")
  .description("A  command-line tool for building ClawCode project")
  .version("0.0.1");

program
  .command("wakeup")
  .description("Wake up ClawCode and pick cli or telegram mode")
  .action(
    async () => {
    console.log("wakeup calling....");
  }
);

await program.parseAsync(process.argv);
