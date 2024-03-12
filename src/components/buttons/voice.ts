import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const voiceButton: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>()
  .addComponents(
    new ButtonBuilder()
      .setCustomId("edit")
      .setEmoji("<:edit:1195419164274331648>")
      .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
      .setCustomId("voice")
      .setEmoji("<:mle4_announcement:1195419206334828567>")
      .setStyle(ButtonStyle.Secondary)
  )