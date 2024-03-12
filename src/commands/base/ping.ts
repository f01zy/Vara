import { CommandInteraction, SlashCommandBuilder } from "discord.js"

export const database = false

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Responds with the word pong")

export const execute = async (interaction: CommandInteraction) => {
  await interaction.reply({ content: `${interaction.client.ws.ping} ms`, ephemeral: true })
}