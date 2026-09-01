import { Telegraf } from "telegraf";
import chalk from "chalk";
import { WELCOME } from "./constants";

export async function runTelegramMode(){
     const token = process.env.TELEGRAM_BOT_TOKEN;
     const ownerId = process.env.TELEGRAM_OWNER_ID;   

     const bot = new Telegraf(token!);
    //  registerHandlers(bot)

  await bot.telegram.sendMessage(ownerId!, WELCOME, { parse_mode: "Markdown" });
}