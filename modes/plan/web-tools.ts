import { tool } from "ai";
import { z } from "zod";
import Firecrawl from "@mendable/firecrawl-js";
import type { ActionTracker } from "../agent/action-tracker.ts";


let client: Firecrawl | null = null;

function getClient(): Firecrawl {
    if(client) return client;

    client = new Firecrawl({
        apiKey: process.env.FIRECRAWL_API_KEY
    })
    return client;
}