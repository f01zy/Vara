import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js"

export const database = "moderation"

export const data = new SlashCommandBuilder()
  .setName("clear")
  .setDescription("Clears the specified number of chat messages")
  .addStringOption(option =>
    option
      .setName("quantity")
      .setDescription("the number of deleted messages")
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)

export const execute = async (interaction: CommandInteraction) => {
  let quantity = await interaction.options.getString("quantity")
  quantity = Number(quantity)
  if (quantity < 1) return await interaction.reply({ content: "I can't delete the number of messages that is less than one", ephemeral: true })
  if (quantity > 100) return await interaction.reply({ content: "I can't delete more than a hundred messages", ephemeral: true })
  try {
    await interaction.channel?.bulkDelete(quantity)
    await interaction.reply({ content: "The messages were successfully deleted", ephemeral: true })
  } catch (e) {
    await interaction.reply({ content: "Some kind of error occurred while executing the command", ephemeral: true })
  }
}