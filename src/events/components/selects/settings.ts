import { EmbedBuilder, Events, StringSelectMenuInteraction } from "discord.js";
import { GuildModel } from "../../../models/Guild";
import { settingsButton } from "../../../components/buttons/settings";
import { settingsBackButton } from "../../../components/buttons/settings_back";

type IChoice = {
  [key: string]: string
}

type IChoices = {
  [key: string]: IChoice
}

let choices: IChoices = {}

export const setSettingsChoice = (guildId: string, memberId: string, value: string) => {
  choices[guildId] = {}
  choices[guildId][memberId] = value
}

export const getSettingsChoice = (guildId: string, memberId: string) => {
  return choices[guildId][memberId]
}

export const type = Events.InteractionCreate

export const once = false

export const execute = async (interaction: StringSelectMenuInteraction) => {
  if (!interaction.isStringSelectMenu()) return

  if (interaction.customId === "settings") {
    await interaction.values.forEach(async value => {
      setSettingsChoice(interaction.guildId!, interaction.user.id, value)
    })

    const guild = (await GuildModel.findOne({ guild_id: interaction.guild?.id }))!
    const choice = getSettingsChoice(interaction.guildId!, interaction.user.id)!.toLowerCase().replace(/\s/g, "_")
    const state = guild[choice]

    const embed = new EmbedBuilder()
      .setTitle(getSettingsChoice(interaction.guildId!, interaction.user.id)!)
      .setDescription(`Click on the appropriate button\nCurrent status: ${state ? "\`enabled\` :white_check_mark:" : "\`turned off\` :cross_mark:"}`)
      .setColor(0xFFBCD9)

    await interaction.message.edit({ embeds: [embed], components: [settingsButton, settingsBackButton] })
    await interaction.deferUpdate()
  }
}