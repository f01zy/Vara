import { DataResolver, REST, Routes } from "discord.js";
import { commands } from "../commands";
import { config } from "../config"
import path from "path";

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST().setToken(config.TOKEN);

export const deployCommands = async () => {
  try {
    await rest.put(
      Routes.applicationCommands(config.CLIENT_ID),
      {
        body: commandsData,
      }
    );

    await rest.patch(Routes.user(), {
      body: { banner: await DataResolver.resolveImage(path.join("banner.jpg")) },
    });

    console.log("[INFO] SUCCESSFULLY RELOADED APPLICATION (/) COMMANDS.");
  } catch (error) {
    console.error(error);
  }
}