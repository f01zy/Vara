import { Client } from "discord.js";
import { events } from "../events";

export const deployEvents = async (client: Client) => {
  for (const event of events) {
    if (event.once) client.once(event.type, (...args) => event.execute(...args))
    else client.on(event.type, (...args) => event.execute(...args))
  }
  console.log("[INFO] SUCCESSFULLY RELOADED APPLICATION (e) EVENTS.");
}