import { ButtonInteraction, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { UserModel } from "../../models/User"
import { leaderboardButton } from "../../components/buttons/leaderboard"

export const setPage = async (interaction: CommandInteraction | ButtonInteraction, page: number, edit: boolean = false) => {
  const members = await UserModel.find({ guild: interaction.guildId })
  members.sort((a, b) => (b.balance + b.bank) - (a.balance + a.bank));

  setLeaderboardChoice(interaction.guildId!, interaction.user.id, {
    page: page,
    quantity: 8
  })
  const memberLeaderboard = getLeaderboardChoice(interaction.guildId!, interaction.user.id)!

  const quantity = memberLeaderboard.quantity
  const pageMembers: typeof members = []

  for (let i = page * quantity; i < page * quantity + quantity; i++) {
    if (!members[i]) continue
    pageMembers.push(members[i])
  }

  const pageMembersFields: Array<IField> = []

  for (let el of pageMembers) {
    const member = interaction.guild?.members.cache.get(el.discord_id)!
    if (!member) continue

    pageMembersFields.push({
      name: member.displayName,
      value: `Balance: ${el.balance}\nBank: ${el.bank}`,
      inline: false
    })
  }

  const avatarURL = interaction.guild?.iconURL()!

  const embed = new EmbedBuilder()
    .setTitle(`__${interaction.guild?.name}__ leaderboard`)
    .addFields(...pageMembersFields)
    .setColor(0xFFBCD9)
    .setThumbnail(avatarURL)
    .setFooter({ text: `page: ${page}/${Math.floor(members.length / memberLeaderboard.quantity)}` })

  const components = leaderboardButton(page === 0 ? true : false, page === Math.floor(members.length / memberLeaderboard.quantity) ? true : false)
  let inter = interaction as ButtonInteraction

  if (edit) await inter.message.edit({ embeds: [embed], components: [components] })
  else await interaction.reply({ embeds: [embed], components: [components] })
}

type ILeaderboardMember = {
  page: number
  quantity: number
}

type ILeaderboard = {
  [key: string]: ILeaderboardMember
}

type ILeaderboards = {
  [key: string]: ILeaderboard
}

export type IField = {
  name: string
  value: string
  inline?: boolean
}

let leaderboards: ILeaderboards = {}

export const setLeaderboardChoice = (guildId: string, memberId: string, value: ILeaderboardMember) => {
  leaderboards[guildId] = {}
  leaderboards[guildId][memberId] = value
}

export const getLeaderboardChoice = (guildId: string, memberId: string) => {
  if (leaderboards[guildId])
    if (leaderboards[guildId][memberId])
      return leaderboards[guildId][memberId]

  return undefined
}

export const database = "economy"

export const data = new SlashCommandBuilder()
  .setName("leaderboard")
  .setDescription("Shows all participants with the highest balance")

export const execute = async (interaction: CommandInteraction) => {
  await setPage(interaction, 0)
}