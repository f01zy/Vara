import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js"

export const database = "moderation"

export const data = new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Kicks the specified user")
  .addUserOption(option =>
    option
      .setName("member")
      .setDescription("The user being deleted")
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName("reason")
      .setDescription("the reason for deleting the user")
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)

export const execute = async (interaction: CommandInteraction) => {
  const user = await interaction.options.getUser("member")!
  const reason = await interaction.options.getString("reason")
  await interaction.guild?.members.kick(user, reason)
  await interaction.reply({ content: "The user was successfully kicked out", ephemeral: true })
}