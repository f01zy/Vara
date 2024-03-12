import { Events, GuildMember, PartialGuildMember } from "discord.js"

export const type = Events.GuildMemberRemove

export const once = false

export const execute = async (member: GuildMember | PartialGuildMember) => {
  if (member.user.bot) return
}