import { Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { UserModel } from "../../models/User"
import path from "path"
import roulette from "../../data/roulette.json"

export const database = "economy"

export const data = new SlashCommandBuilder()
  .setName("roulette")
  .setDescription("Playing roulette")
  .addNumberOption(option =>
    option
      .setName("bet")
      .setDescription("Your bid")
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName("field")
      .setDescription("The field on which you will bet")
      .setRequired(true)
      .addChoices({ name: "red", value: "red" }, { name: "black", value: "black" }, { name: "3rd", value: "3rd" }, { name: "2nd", value: "2nd" }, { name: "1st", value: "1st" }, { name: "1-12", value: "1-12" }, { name: "13-24", value: "13-24" }, { name: "25-36", value: "25-36" })
  )

export const execute = async (interaction: CommandInteraction) => {
  const user = (await UserModel.findOne({ discord_id: interaction.user.id, guild: interaction.guild?.id }))!
  const choice: string = await interaction.options.getString("field")
  const bet: number = await interaction.options.getNumber("bet")
  const number = Math.floor(Math.random() * (36 - 1) + 1)

  if (user.balance < bet) {
    const embed = new EmbedBuilder()
      .setTitle("Roulette error")
      .setDescription("There are not enough funds in your account!")
      .setColor(Colors.Red)

    return await interaction.reply({ embeds: [embed] })
  }

  const embed = new EmbedBuilder()
    .setImage("attachment://casino.png")

  const casino_path = path.join(__dirname, "..", "..", "..", "casino.png")

  if (roulette[choice].indexOf(Number(number)) != -1) {
    user.balance += bet
    user.save()
    embed.setTitle("Winner")
    embed.setDescription(`Congratulations, you have won \`${bet}\` :coin:. The number that fell out: \`${number}\``)
    embed.setColor(Colors.Green)

    await interaction.reply({ embeds: [embed], files: [{ attachment: casino_path, name: "casino.png" }] })
  } else {
    user.balance -= bet
    user.save()
    embed.setTitle("Loss")
    embed.setDescription(`I'm sorry, but you played \`${bet}\` :coin:. The number that fell out: \`${number}\``)
    embed.setColor(Colors.Red)

    await interaction.reply({ embeds: [embed], files: [{ attachment: casino_path, name: "casino.png" }] })
  }
}