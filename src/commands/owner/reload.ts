import { Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { deployCommands } from "../../setup/commands"
import { deployEvents } from "../../setup/event"
import mongoose from "mongoose"
import { setupDatabase } from "../../setup/database"

export const database = false

export const data = new SlashCommandBuilder()
  .setName("reload")
  .setDescription("Owner only")

export const execute = async (interaction: CommandInteraction) => {
  if (interaction.user.id != process.env.OWNER) {
    await interaction.reply({ content: "This command is available only to the bot owner", ephemeral: true })
  } else {
    const start = new EmbedBuilder()
      .setTitle("Reload")
      .setDescription("<a:load:1220273457116217406> The bot is rebooting")
      .setColor(Colors.Yellow)

    await interaction.reply({ embeds: [start] })

    interaction.client.destroy().then(() => {
      deployCommands()
      deployEvents(interaction.client)
    }).then(async () => {
      setTimeout(async () => {
        const botReloaded = new EmbedBuilder()
          .setTitle("Reload")
          .setDescription("<a:load:1220273457116217406> The database are rebooting")
          .setColor(Colors.Yellow)
          .addFields({
            name: "Bot",
            value: "The bot has been rebooted"
          })

        await interaction.editReply({ embeds: [botReloaded] })
      }, 1000)
    }).catch(async () => {
      const error = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("An error occurred when restarting the bot, we have already addressed it")
        .setColor(Colors.Red)

      await interaction.editReply({ embeds: [error] })
    })

    const db = mongoose.connection

    mongoose.disconnect().then(() => {
      setupDatabase().then(() => {
        const databaseReloaded = new EmbedBuilder()
          .setTitle("Reload")
          .setDescription("<a:success:1220278331531071509> All systems have been successfully rebooted")
          .setColor(Colors.Green)
          .addFields({
            name: "Bot",
            value: "The bot has been rebooted"
          }, {
            name: "Database",
            value: "The database has been rebooted"
          })

        setTimeout(async () => {
          await interaction.editReply({ embeds: [databaseReloaded] })
        }, 1000)
      }).catch(async () => {
        const error = new EmbedBuilder()
          .setTitle("Error")
          .setDescription("An error occurred when restarting the bot, we have already addressed it")
          .setColor(Colors.Red)

        await interaction.editReply({ embeds: [error] })
      })
    })
  }
}