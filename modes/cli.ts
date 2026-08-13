import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";

export async function runCliMode() {
    while (true) {
        const mode = await select({
            message: "Choose CLI sub-mode:",
            options: [
                {value: "agent", label: "Agent Mode"},
                {value: "plan", label: "Plan Mode"},
                {value: "ask", label: "Ask Mode"},
                {value: "back", label: "← Back to Main Menu"},
            ],
        });

        if (isCancel(mode) || mode === "back") return;

        if (mode === "agent") {
            console.log(chalk.green("You have selected Agent mode. Proceeding with Agent..."));
        }
        if (mode === "plan") {
            console.log(chalk.green("You have selected Plan mode. Proceeding with Plan..."));
        }
        if (mode === "ask") {
            console.log(chalk.green("You have selected Ask mode. Proceeding with Ask..."));
        }

        if(mode !== "agent" && mode !== "plan" && mode !== "ask") {
            console.log(chalk.red("Invalid selection. Please choose a valid option."));
        }
    }
}