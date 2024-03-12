import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import fs from "fs"
import path from "path";
import { botButton } from "../../components/buttons/bot";

function getFolderSize(directoryPath: string) {
  let totalSize = 0;

  function readDirectory(directory: string) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
      const fullPath = path.join(directory, file);
      const fileStat = fs.statSync(fullPath);
      if (fileStat.isDirectory()) {
        readDirectory(fullPath);
      } else {
        totalSize += fileStat.size;
      }
    }
  }

  readDirectory(directoryPath);
  return totalSize / 1000000;
}

export const database = false

export const data = new SlashCommandBuilder()
  .setName("bot")
  .setDescription("Bot statistics")

export const execute = async (interaction: CommandInteraction) => {
  await interaction.deferReply()

  let guilds = 0

  interaction.client.guilds.cache.map(guild => guilds++)

  const embed = new EmbedBuilder()
    .setTitle("Statistic")
    .setColor(0xFFBCD9)
    .addFields({
      name: "Ping :ping_pong:",
      value: `\`${interaction.client.ws.ping}\` ms`,
      inline: true
    }, {
      name: "RAM",
      value: `\`${getFolderSize(path.join()).toFixed(2)}\` mb`,
      inline: true
    }, {
      name: "Version",
      value: `\`${process.env.VERSION}\``,
      inline: true
    }, {
      name: "Guilds",
      value: `\`${guilds}\` guilds`,
      inline: true
    })
    .setThumbnail(interaction.user.avatarURL())

  await interaction.editReply({ embeds: [embed], components: [botButton] })
}