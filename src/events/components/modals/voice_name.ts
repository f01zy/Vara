import { Events, ModalSubmitInteraction } from "discord.js";

export const type = Events.InteractionCreate

export const once = false

export const execute = async (interaction: ModalSubmitInteraction) => {
  if (!interaction.isModalSubmit()) return
  const user = await interaction.guild?.members.fetch(interaction.user.id)!
  const channel = user.voice.channel!

  if (interaction.customId === "channel_name") {
    const name = await interaction.fields.getTextInputValue("name")
    await channel.edit({
      name: name
    })
    await interaction.reply({ content: "The name of the room has been successfully changed!", ephemeral: true })
  }
}