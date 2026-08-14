import { isCancel, text } from "@clack/prompts";
import chalk from "chalk";
import { defaultAgentConfig } from "./types";

export async function runAgentMode(){
    console.log(chalk.bold("\n🤖 Agent Mode\n"));

    const goal = await text({
        message: "What would you like the agent to do?",
        placeholder: "Enter your goal here...",
    })

    if(isCancel(goal) || !goal.trim()) return;

    const config = defaultAgentConfig();
}