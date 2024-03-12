import { Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { random } from "../../utils/random"
import { UserModel } from "../../models/User"

export const database = "economy"

export const data = new SlashCommandBuilder()
  .setName("work")
  .setDescription("The command to earn money on the server")

export const execute = async (interaction: CommandInteraction) => {
  const user = await UserModel.findOne({ discord_id: interaction.user.id, guild: interaction.guild?.id }); if (!user) return
  const today = new Date()
  const botCooldown = 4 * 60 * 60 * 1000
  const isAvailable = today.getTime() - user.work_time.getTime() >= botCooldown

  if (isAvailable) {
    const win = random(1000, 5000)
    user.work_time = new Date()
    user.balance += win
    user.save()
    const embed = new EmbedBuilder()
      .setTitle("Work")
      .setDescription(`You did a good job today and earned ${win} :coin:`)
      .setColor(Colors.Green)

    await interaction.reply({ embeds: [embed] })
  } else {
    const cooldown = Math.ceil((botCooldown - (today.getTime() - user.work_time.getTime())) / 1000 / 60 / 60)
    const embed = new EmbedBuilder()
      .setTitle("Work error")
      .setDescription(`You have already used this command, you will be able to use it again in \`${cooldown}\` hours`)
      .setColor(Colors.Red)

    await interaction.reply({ embeds: [embed] })
  }
}