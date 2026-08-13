import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";

const BANNER_FONT = "ANSI Shadow";
const SHADOW = chalk.hex("#5b4d9e");
const FACE = chalk.hex("#e8dcf8").bold;

function printBannerWithShadow(ascii: string) {
  const bannerLines = ascii.replace(/\s+$/, "").split("\n");
  const maxLen = Math.max(...bannerLines.map((l) => l.length), 0);
  const rowWidth = maxLen + 2;

  for (const line of bannerLines) {
    console.log(SHADOW(("  " + line).padEnd(rowWidth)));
  }
  process.stdout.write(`\x1b[${bannerLines.length}A`);
  for (const line of bannerLines) {
    console.log(FACE(line.padEnd(rowWidth)));
  }
  console.log();
}

export async function runWakeup() {
    let ascii: string;
    try {
        ascii = figlet.textSync("ClawCode", { font: BANNER_FONT });
    } catch (error) {
        ascii = figlet.textSync("ClawCode", { font: "Standard" });
    }

  printBannerWithShadow(ascii);

  const mode = await select({
    message: "Which mode you want to proceed with?",
    options: [
        {value: "cli", label: "CLI"},
        {value: "telegram", label: "Telegram"}
        // {value: "whatsapp", label: "Whatsapp"},
    ]
  });

    if (isCancel(mode)) {
        process.exit(0);
    }

    if (mode === "cli") {
        console.log(chalk.green("You have selected CLI mode. Proceeding with CLI..."));
    }    
    else if(mode === "telegram") {
        console.log(chalk.green("You have selected Telegram mode. Proceeding with Telegram..."));
    }

}
