import { Colors, CommandInteraction, EmbedBuilder, PermissionFlagsBits, Role, SlashCommandBuilder } from "discord.js"
import { GuildModel } from "../../models/Guild"
import { RoleModel } from "../../models/Role"

export const database = "economy"

export const data = new SlashCommandBuilder()
  .setName("add")
  .setDescription("Add an item to the store")
  .addRoleOption(option =>
    option
      .setName("role")
      .setDescription("The role you are adding to the store")
      .setRequired(true)
  )
  .addNumberOption(option =>
    option
      .setName("price")
      .setDescription("At what price will the role be sold?")
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export const execute = async (interaction: CommandInteraction) => {
  const guild = (await GuildModel.findOne({ guild_id: interaction.guild?.id }))!

  const role: Role = await interaction.options.getRole("role")
  const price: number = await interaction.options.getNumber("price")

  const model_role = await RoleModel.create({ role_id: role.id, price })
  guild.shop.push(model_role._id)
  guild.save()

  const embed = new EmbedBuilder()
    .setTitle("Success")
    .setDescription(`The item <@&${role.id}> was successfully added to the store`)
    .setColor(Colors.Green)

  await interaction.reply({ embeds: [embed] })
}