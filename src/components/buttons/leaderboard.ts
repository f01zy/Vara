import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const leaderboardButton = (backBlocked: boolean, nextBlocked: boolean): ActionRowBuilder<ButtonBuilder> => new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder()
    .setCustomId("leaderboard_start")
    .setEmoji("⏪")
    .setDisabled(backBlocked)
    .setStyle(ButtonStyle.Success),

  new ButtonBuilder()
    .setCustomId("leaderboard_back")
    .setEmoji("◀️")
    .setDisabled(backBlocked)
    .setStyle(ButtonStyle.Success),

  new ButtonBuilder()
    .setCustomId("leaderboard_next")
    .setEmoji("▶️")
    .setDisabled(nextBlocked)
    .setStyle(ButtonStyle.Success),

  new ButtonBuilder()
    .setCustomId("leaderboard_end")
    .setEmoji("⏩")
    .setDisabled(nextBlocked)
    .setStyle(ButtonStyle.Success),
)