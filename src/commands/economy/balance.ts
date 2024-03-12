import { CommandInteraction, SlashCommandBuilder } from "discord.js"
import { UserModel } from "../../models/User"
import { EmbedBuilder } from "@discordjs/builders"

export const database = "economy"

export const data = new SlashCommandBuilder()
  .setName("balance")
  .setDescription("Shows your balance on the server")

export const execute = async (interaction: CommandInteraction) => {
  const user = (await UserModel.findOne({ discord_id: interaction.user.id, guild: interaction.guild?.id }))!
  const today = new Date().getTime()
  const workCooldown = 4 * 60 * 60 * 1000
  const cooldown = Math.ceil((workCooldown - (today - user.work_time.getTime())) / 1000 / 60 / 60)
  const embed = new EmbedBuilder()
    .setTitle(interaction.user.username)
    .setDescription(`The user ${interaction.user.username} balance on the server ${interaction.guild?.name}`)
    .setThumbnail(interaction.user.avatarURL())
    .addFields({
      name: "balance",
      value: `${user.balance} :coin:`,
      inline: true
    }, {
      name: "bank",
      value: `${user.bank} :coin:`,
      inline: true
    }, {
      name: "Work",
      value: `${cooldown <= 0 ? "Now" : `After \`${cooldown}\` hours`}`,
      inline: true
    })
    .setColor(0xFFBCD9)

  await interaction.reply({ embeds: [embed] })
}