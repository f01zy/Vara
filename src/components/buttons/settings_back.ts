import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const settingsBackButton: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder()
    .setCustomId("settings_back")
    .setLabel("Back")
    .setStyle(ButtonStyle.Secondary)
)