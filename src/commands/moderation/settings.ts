import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js"
import { GuildModel } from "../../models/Guild"
import { EmbedBuilder } from "@discordjs/builders"
import { settingsSelect } from "../../components/selects/settings"

export const settingsStartEmbed = new EmbedBuilder()
  .setTitle("Settings")
  .setDescription("To set up a bot on your server, select the item you need")
  .setColor(0xFFBCD9)

export const database = false

export const data = new SlashCommandBuilder()
  .setName("settings")
  .setDescription("Settings bot in this server")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export const execute = async (interaction: CommandInteraction) => {
  await interaction.reply({ embeds: [settingsStartEmbed], components: [settingsSelect]! })
}