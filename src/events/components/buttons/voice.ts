import { ButtonInteraction, Events } from "discord.js";
import { voiceNameModal } from "../../../components/modals/voice_name";
import { voiceLimitModal } from "../../../components/modals/voice_limit";

export const type = Events.InteractionCreate

export const once = false

export const execute = async (interaction: ButtonInteraction) => {
  if (!interaction.isButton()) return

  const user = await interaction.guild?.members.fetch(interaction.user.id)!
  const voice = user.voice.channel

  if (interaction.customId === "edit") {
    if (!voice) {
      return await interaction.reply({ content: "To start this function, you must be in the voice channel", ephemeral: true })
    }

    await interaction.showModal(voiceNameModal)
  }

  if (interaction.customId === "voice") {
    if (!voice) {
      return await interaction.reply({ content: "To start this function, you must be in the voice channel", ephemeral: true })
    }

    await interaction.showModal(voiceLimitModal)
  }
}