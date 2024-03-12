import { Events, ModalSubmitInteraction } from "discord.js";

export const type = Events.InteractionCreate

export const once = false

export const execute = async (interaction: ModalSubmitInteraction) => {
  if (!interaction.isModalSubmit()) return
  const user = await interaction.guild?.members.fetch(interaction.user.id)!
  const channel = user.voice.channel!

  if (interaction.customId === "user_limit") {
    const limit = await interaction.fields.getTextInputValue("limit")
    const num = parseFloat(limit)
    if (Number.isNaN(num)) return await interaction.reply({ content: "Enter the correct number", ephemeral: true })
    await channel.edit({
      userLimit: Number(limit)
    })
    await interaction.reply({ content: "The maximum number of participants in the room has been successfully changed!", ephemeral: true })
  }
}