import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { GuildModel } from "../../models/Guild"
import { IRole } from "../../models/Role"

interface IField {
  value: string
  name: string
}

export const database = "economy"

export const data = new SlashCommandBuilder()
  .setName("shop")
  .setDescription("Shop in this server")

export const execute = async (interaction: CommandInteraction) => {
  const guildDb = (await GuildModel.findOne({ guild_id: interaction.guild?.id }))!

  const embed = new EmbedBuilder()
    .setTitle(`__${interaction.guild?.name}__ shop`)
    .setColor(0xFFBCD9)

  if (guildDb.shop.length == 0) {
    embed.setDescription("There's nothing in the store yet, come back later")
    return await interaction.reply({ embeds: [embed] })
  }

  const guild: Array<IRole> = (await guildDb.populate([{ path: "shop" }])).shop!

  const fields: Array<IField> = []

  guild.map(async el => {
    const role = await interaction.guild?.roles.cache.get(el.role_id)!

    const role_object = {
      name: role.name,
      value: `price: \`${el.price}\``
    }

    fields.push(role_object)
  })

  embed.addFields(fields)

  await interaction.reply({ embeds: [embed] })
}