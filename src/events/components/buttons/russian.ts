import { ButtonInteraction, Colors, EmbedBuilder, Events } from "discord.js"
import { clearRussian, getDataRussian, setValueRussian } from "../../../commands/economy/russian"
import { UserModel } from "../../../models/User"

export const type = Events.InteractionCreate

export const once = false

export const execute = async (interaction: ButtonInteraction) => {
  if (!interaction.isButton()) return

  if (interaction.customId === "Shot") {
    const data = getDataRussian(interaction.user.id)

    if (!data) return

    const user = (await UserModel.findOne({ discord_id: interaction.user.id, guild: interaction.guild?.id }))!

    if (data.step + 1 === data.number) {
      const embed = new EmbedBuilder()
        .setTitle("You're dead")
        .setDescription(`You were unlucky and the bullet still got you, your loss: \`${data.bet}\``)
        .setColor(Colors.Red)

      clearRussian(interaction.user.id)

      user.balance -= data.bet
      user.save()

      await interaction.message.edit({ embeds: [embed], components: [] })
      await interaction.deferUpdate()
    } else {
      setValueRussian(interaction.user.id, "step", data.step + 1)

      const embed = new EmbedBuilder()
        .setDescription(`To shoot, click on the \`shot\` button, and if you want to collect your winnings, then click on the \`collect\` button.\n\nCurrent rate: \`${data.bet}\` :coin:\nCurrent winnings: \`${Math.floor(data.bet * (0.4 * (data.step)))}\``)
        .setColor(Colors.Green)

      await interaction.message.edit({ embeds: [embed] })
      await interaction.deferUpdate()
    }
  }

  if (interaction.customId === "Collect") {
    const data = getDataRussian(interaction.user.id)!
    const user = (await UserModel.findOne({ discord_id: interaction.user.id, guild: interaction.guild?.id }))!

    const embed = new EmbedBuilder()
      .setTitle("You're alive")
      .setDescription(`You stopped in time, and earned \`${Math.floor(data.bet * (0.4 * data.step))}\`, and the bullet was in \`${data.number - data.step}\` moves`)
      .setColor(Colors.Green)

    clearRussian(interaction.user.id)

    user.balance += Math.floor(data.bet * (0.4 * data.step))
    user.save()

    await interaction.message.edit({ embeds: [embed], components: [] })
    await interaction.deferUpdate()
  }
}