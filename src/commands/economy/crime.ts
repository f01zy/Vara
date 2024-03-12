import { Colors, CommandInteraction, SlashCommandBuilder } from "discord.js"
import { UserModel } from "../../models/User"
import { EmbedBuilder } from "@discordjs/builders"

export const database = "economy"

export const data = new SlashCommandBuilder()
  .setName("crime")
  .setDescription("Commit a criminal case")

export const execute = async (interaction: CommandInteraction) => {
  const user = (await UserModel.findOne({ discord_id: interaction.user?.id, guild: interaction.guild?.id }))!
  const today = new Date()
  const botCooldown = 4 * 60 * 60 * 1000
  const isAvailable = today.getTime() - user.crime_time.getTime() >= botCooldown

  if (isAvailable) {
    const texts_true = ["You stole a purse from a passerby and earned", "You robbed the store and earned", "You robbed a bank and earned"]
    const texts_false = ["You were bookmarking drugs but you were caught, you've lost", "You tried to rob a bank, but everything didn't go according to plan, you've lost"]

    const bool = Math.floor(Math.random() * (3 - 1) + 1) == 2 ? false : true
    const win = Math.floor(Math.random() * (3000 - 700) + 700)

    if (user.balance < 3000) {
      return await interaction.reply({ content: "You must have at least 3,000 coins in your account", ephemeral: true })
    }

    user.crime_time = new Date()

    if (bool) {
      const text = texts_true[Math.floor(Math.random() * texts_true.length)];
      user.balance += win

      const embed = new EmbedBuilder()
        .setTitle("Success")
        .setDescription(`${text} ${win} :coin:`)
        .setColor(Colors.Green)

      await interaction.reply({ embeds: [embed] })
    } else {
      const text = texts_false[Math.floor(Math.random() * texts_false.length)];
      user.balance -= win

      const embed = new EmbedBuilder()
        .setTitle("Failure")
        .setDescription(`${text} ${win} :coin:`)
        .setColor(Colors.Red)

      await interaction.reply({ embeds: [embed] })
    }
    user.save()
  } else {
    const cooldown = Math.ceil((botCooldown - (today.getTime() - user.crime_time.getTime())) / 1000 / 60 / 60)
    const embed = new EmbedBuilder()
      .setTitle("Crime error")
      .setDescription(`You have already used this command, come back in \`${cooldown}\` hours`)
      .setColor(Colors.Red)

    await interaction.reply({ embeds: [embed] })
  }
}