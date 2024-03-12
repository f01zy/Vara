import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const russianButton: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder()
    .setCustomId("Shot")
    .setLabel("Shot")
    .setStyle(ButtonStyle.Secondary),
  new ButtonBuilder()
    .setCustomId("Collect")
    .setLabel("Collect")
    .setStyle(ButtonStyle.Success)
)