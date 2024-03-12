import { Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { UserModel } from "../../models/User"
import { russianButton } from "../../components/buttons/russian"

interface IUserValue {
  step: number
  bet: number
  number: number
}

interface IValues {
  [key: string]: IUserValue
}

const values: IValues = {}

export const clearRussian = (userID: string) => {
  if (!values[userID]) {
    return
  }

  delete values[userID]
}

export const setValueRussian = (userID: string, key: string, value: number) => {
  if (!values[userID]) {
    values[userID] = {
      bet: 0,
      number: 0,
      step: 0
    }
  }

  switch (key) {
    case "step":
      values[userID].step = value
      break

    case "bet":
      values[userID].bet = value
      break

    case "number":
      values[userID].number = value
      break
  }
}

export const getDataRussian = (userID: string) => {
  if (!values[userID]) {
    return undefined
  }

  return values[userID]
}

export const database = "economy"

export const data = new SlashCommandBuilder()
  .setName("russian")
  .setDescription("Playing russian roulette")
  .addNumberOption(option =>
    option
      .setName("bet")
      .setDescription("Your bid")
      .setRequired(true)
  )

export const execute = async (interaction: CommandInteraction) => {
  if (values[interaction.user.id]) return await interaction.reply({ content: "Finish the previous game before starting the next one", ephemeral: true })

  const bet: number = await interaction.options.getNumber("bet")
  const user = (await UserModel.findOne({ discord_id: interaction.user.id, guild: interaction.guild?.id }))!
  const number = Math.floor(Math.random() * (7 - 2 + 1)) + 2

  if (user.balance < bet) return await interaction.reply({ content: "There are not enough funds in your account", ephemeral: true })

  setValueRussian(interaction.user.id, "number", number)
  setValueRussian(interaction.user.id, "bet", bet)
  setValueRussian(interaction.user.id, "step", 0)

  const embed = new EmbedBuilder()
    .setTitle("Russian roulette")
    .setDescription(`To shoot, click on the \`shot\` button, and if you want to collect your winnings, then click on the \`collect\` button.\n\nCurrent rate: \`${bet}\` :coin:\nCurrent winnings: \`0\``)
    .setColor(Colors.Green)

  await interaction.reply({ embeds: [embed], components: [russianButton] })
}