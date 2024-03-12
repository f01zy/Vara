import { Colors, CommandInteraction, EmbedBuilder, PermissionFlagsBits, Role, SlashCommandBuilder } from "discord.js"
import { GuildModel } from "../../models/Guild"
import { IRole, RoleModel } from "../../models/Role"

export const database = "economy"

export const data = new SlashCommandBuilder()
  .setName("delete_item")
  .setDescription("Remove an item from the store")
  .addRoleOption(option =>
    option
      .setName("role")
      .setDescription("The role that you will be removing from the store")
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export const execute = async (interaction: CommandInteraction) => {
  let guild = (await GuildModel.findOne({ guild_id: interaction.guild?.id }))!

  if (guild.shop.length == 0) return await interaction.reply({ content: "The item does not exist in the store", ephemeral: true })

  const role: Role = await interaction.options.getRole("role")

  guild = await guild.populate([{ path: "shop" }])

  if (!guild.shop.some(el => el.role_id == role.id)) return await interaction.reply({ content: "The item does not exist in the store", ephemeral: true })

  guild.shop = guild.shop.filter(el => el.role_id != role.id)
  guild.save()

  await RoleModel.deleteOne({ role_id: role.id })

  const embed = new EmbedBuilder()
    .setTitle("Success")
    .setDescription(`The item <@&${role.id}> was successfully removed from the store`)
    .setColor(Colors.Green)

  await interaction.reply({ embeds: [embed] })
}