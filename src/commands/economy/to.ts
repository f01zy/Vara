import { Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { UserModel } from "../../models/User"

export const database = "economy"

export const data = new SlashCommandBuilder()
  .setName("to")
  .setDescription("Transferring money from a bank to an account and vice versa")
  .addStringOption(option =>
    option
      .setName("from")
      .setDescription("Where will you transfer the money")
      .addChoices({ name: "Account", value: "Account" }, { name: "Bank", value: "Bank" })
      .setRequired(true)
  )
  .addIntegerOption(option =>
    option
      .setName("money")
      .setDescription("how much will you withdraw/transfer")
      .setRequired(true)
  )

export const execute = async (interaction: CommandInteraction) => {
  const from: string = await interaction.options.getString("from")
  const user = (await UserModel.findOne({ discord_id: interaction.user.id, guild: interaction.guild?.id }))!
  let money: number = await interaction.options.getInteger("money")
  money = Number(money)
  const error_embed = new EmbedBuilder()
    .setTitle("Transfer error")
    .setDescription("There are not enough funds in your account/bank")
    .setColor(Colors.Red)
  const success_embed = new EmbedBuilder()
    .setTitle("Success")
    .setDescription("The money was successfully withdrawn/transferred")
    .setColor(Colors.Green)

  if (from == "Account") {
    if (user.bank < money) return await interaction.reply({ embeds: [error_embed] })

    user.bank -= money
    user.balance += money
    user.save()

    await interaction.reply({ embeds: [success_embed] })
  } else if (from == "Bank") {
    if (user.balance < money) return await interaction.reply({ embeds: [error_embed] })

    user.bank += money
    user.balance -= money
    user.save()

    await interaction.reply({ embeds: [success_embed] })
  }
}