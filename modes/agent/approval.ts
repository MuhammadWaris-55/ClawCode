import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import type { ActionTracker } from "./action-tracker.ts";
import type { ActionLog } from "./types.ts";


interface ReviewGroup{
    label: string;
    actionIds: string[];
    patch: string | null
}

export async function runApprovalFlow(tracker: ActionTracker): Promise<boolean> {
    const pending = tracker.getPendingMutations();

    if(pending.length === 0) {
         console.log(chalk.green("\nNo staged changes to approve. All done!"));
        return false;
    }

    const choice = await select({
        message: "Apply staged changes?",
        options: [
            { value: "all", label: " Approve and apply all changes" },
            { value: "select", label: "🔍 Review changes one by one" },
            { value: "cancel", label: " Reject all changes" },
        ],
    });

    if (isCancel(choice) || choice === "cancel") {
        for(const a of pending) tracker.updateStatus(a.id, "rejected", false);
        return false;
    }
}