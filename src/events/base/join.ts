import { Events, GuildMember } from "discord.js"
import { register } from "../../utils/register"

export const type = Events.GuildMemberAdd

export const once = false

export const execute = async (member: GuildMember) => {
  if (member.user.bot) return
  await register(member.id, member.guild.id, member.user.username)
}