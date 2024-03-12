import { ButtonInteraction, Events } from "discord.js"
import { settingsSelect } from "../../../components/selects/settings"
import { settingsStartEmbed } from "../../../commands/moderation/settings"

export const type = Events.InteractionCreate

export const once = false

export const execute = async (interaction: ButtonInteraction) => {
  if (!interaction.isButton()) return

  if (interaction.customId === "settings_back") {
    await interaction.message.edit({ embeds: [settingsStartEmbed], components: [settingsSelect] })
    await interaction.deferUpdate()
  }
}