import { Events, GuildMember, Message } from "discord.js"
import { register } from "../../utils/register"
import { GuildModel } from "../../models/Guild"
import { UserModel } from "../../models/User"

export const type = Events.MessageCreate

export const once = false

export const execute = async (message: Message) => {
  if (message.author.bot) return

  const guild = (await GuildModel.findOne({ guild_id: message.guild?.id }))!

  if (!guild.rating) return

  const user = (await UserModel.findOne({ discord_id: message.author.id, guild: message.guild?.id }))!

  const exp = Math.floor(Math.random() * (5 - 1) + 1)

  if (user.rating + exp >= user.level * 100) {
    user.rating = 0
    user.level++
  } else {
    user.rating += exp
  }

  user.save()
}