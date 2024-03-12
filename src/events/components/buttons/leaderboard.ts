import { ButtonInteraction, Events } from "discord.js"
import { getLeaderboardChoice, setPage } from "../../../commands/economy/leaderboard"
import { UserModel } from "../../../models/User"

export const type = Events.InteractionCreate

export const once = false

export const execute = async (interaction: ButtonInteraction) => {
  if (!interaction.isButton()) return

  if (interaction.customId === "leaderboard_start") {
    await setPage(interaction, 0, true)
    await interaction.deferUpdate()
  }

  if (interaction.customId === "leaderboard_back") {
    const memberLeaderboard = getLeaderboardChoice(interaction.guildId!, interaction.user.id)!
    await setPage(interaction, memberLeaderboard?.page - 1, true)
    await interaction.deferUpdate()
  }

  if (interaction.customId === "leaderboard_next") {
    const memberLeaderboard = getLeaderboardChoice(interaction.guildId!, interaction.user.id)!
    await setPage(interaction, memberLeaderboard?.page + 1, true)
    await interaction.deferUpdate()
  }

  if (interaction.customId === "leaderboard_end") {
    const members = await UserModel.find({ guild: interaction.guildId })
    const memberLeaderboard = getLeaderboardChoice(interaction.guildId!, interaction.user.id)!
    const page = Math.floor(members.length / memberLeaderboard.quantity)
    await setPage(interaction, page, true)
    await interaction.deferUpdate()
  }
}