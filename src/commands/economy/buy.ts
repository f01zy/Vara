import { Colors, CommandInteraction, EmbedBuilder, Role, SlashCommandBuilder } from "discord.js"
import { GuildModel } from "../../models/Guild"
import { UserModel } from "../../models/User"
import { IRole } from "../../models/Role"

export const database = "economy"

export const data = new SlashCommandBuilder()
  .setName("buy")
  .setDescription("Buy an item in the store")
  .addRoleOption(option =>
    option
      .setName("role")
      .setDescription("The purchased role")
      .setRequired(true)
  )

export const execute = async (interaction: CommandInteraction) => {
  let guildDb = (await GuildModel.findOne({ guild_id: interaction.guild?.id }))!
  let user = (await UserModel.findOne({ discord_id: interaction.user.id, guild: interaction.guild?.id }))!
  let role: Role = await interaction.options.getRole("role")

  if (guildDb.shop.length == 0) return await interaction.reply({ content: "The item does not exist in the store", ephemeral: true })

  const guild: Array<IRole> = (await guildDb.populate([{ path: "shop" }])).shop!

  if (!guild.some(el => el.role_id == role.id)) return await interaction.reply({ content: "The item does not exist in the store", ephemeral: true })

  const role_from_db = guild.find(el => el.role_id == role.id)!

  if (role_from_db.price > user.balance) return await interaction.reply({ content: "There are not enough funds in your account", ephemeral: true })

  role = await interaction.guild?.roles.cache.get(role.id)!

  const guildMember = await interaction.guild?.members.cache.get(interaction.user.id)!

  if (guildMember.roles.cache.some(el => el.id == role.id)) return await interaction.reply({ content: "The role has already been purchased", ephemeral: true })

  guildMember.roles.add(role)

  user.balance -= role_from_db.price
  user.save()

  const embed = new EmbedBuilder()
    .setTitle("Success")
    .setDescription(`The role \`${role.name}\` was successfully purchased`)
    .setColor(Colors.Green)

  await interaction.reply({ embeds: [embed] })
}