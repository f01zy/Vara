import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js"

export const database = "moderation"

export const data = new SlashCommandBuilder()
  .setName("ban")
  .setDescription("Ban the specified user")
  .addUserOption(option =>
    option
      .setName("member")
      .setDescription("The user being banned")
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)

export const execute = async (interaction: CommandInteraction) => {
  const user = await interaction.options.getUser("member")!
  await interaction.guild?.members.ban(user)
  await interaction.reply({ content: "The user was successfully banned", ephemeral: true })
}