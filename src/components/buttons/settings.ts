import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const settingsButton: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>()
  .addComponents(
    new ButtonBuilder()
      .setCustomId("include")
      .setLabel("Include")
      .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
      .setCustomId("disable")
      .setLabel("Disable")
      .setStyle(ButtonStyle.Danger)
  )