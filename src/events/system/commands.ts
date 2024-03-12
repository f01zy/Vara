import { Colors, CommandInteraction, EmbedBuilder, Events } from "discord.js";
import { commands } from "../../commands";
import { GuildModel } from "../../models/Guild";

export const type = Events.InteractionCreate

export const once = false

export const execute = async (interaction: CommandInteraction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;

  if (commands[commandName as keyof typeof commands]) {
    const command = commands[commandName as keyof typeof commands]
    let guild = await GuildModel.findOne({ guild_id: interaction.guildId });

    if (!guild) {
      await GuildModel.create({ guild_id: interaction.guild?.id })
      guild = (await GuildModel.findOne({ guild_id: interaction.guildId }))!
    }

    if (command.database) {
      if (!guild[command.database]) {
        const embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription("This type of command is disabled on your server. You can enable them by writing the \`/settings\` command and selecting the item you need")
          .setColor(Colors.Red)

        return await interaction.reply({ embeds: [embed] })
      }
    }

    try {
      command.execute(interaction);
    } catch (err) {
      console.log(err)
    }
  }
}