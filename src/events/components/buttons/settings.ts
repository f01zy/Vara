import { ButtonInteraction, CommandInteraction, Events } from "discord.js"
import { GuildModel } from "../../../models/Guild"
import { getSettingsChoice } from "../selects/settings"
import { settingsStartEmbed } from "../../../commands/moderation/settings"
import { settingsSelect } from "../../../components/selects/settings"
import { createPrivateVoiceRooms } from "../selects/utils/create_private_voice_rooms"
import { deletePrivateVoiceRooms } from "../selects/utils/delete_private_voice_rooms"

export const type = Events.InteractionCreate

export const once = false

export const execute = async (interaction: ButtonInteraction) => {
  if (!interaction.isButton()) return

  if (interaction.customId === "include") {
    const guild = (await GuildModel.findOne({ guild_id: interaction.guild?.id }))!

    const choice = getSettingsChoice(interaction.guildId!, interaction.user.id)!.toLowerCase().replace(/\s/g, "_")

    if (guild[choice]) {
      return
    }


    if (choice === "voice_rooms") createPrivateVoiceRooms(interaction)
    else guild[choice] = true
    guild.save()

    await interaction.message.edit({ embeds: [settingsStartEmbed], components: [settingsSelect] })
    await interaction.deferUpdate()
  }

  if (interaction.customId === "disable") {
    const guild = (await GuildModel.findOne({ guild_id: interaction.guild?.id }))!
    const choice = getSettingsChoice(interaction.guildId!, interaction.user.id)

    if (choice === "Voice rooms") deletePrivateVoiceRooms(interaction)
    else guild[choice] = false
    guild.save()

    await interaction.message.edit({ embeds: [settingsStartEmbed], components: [settingsSelect] })
    await interaction.deferUpdate()
  }
}