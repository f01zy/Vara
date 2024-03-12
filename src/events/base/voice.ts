import { ChannelType, Events, PermissionFlagsBits, VoiceState } from "discord.js"
import { GuildModel } from "../../models/Guild"
import { IPrivateVoiceRooms } from "../../models/Voice"

export const type = Events.VoiceStateUpdate

export const once = false

export const execute = async (oldState: VoiceState, newState: VoiceState) => {
  const guild = (await GuildModel.findOne({ guild_id: oldState.guild?.id }))!

  if (guild.voice_rooms) {
    const voiceFromDb: IPrivateVoiceRooms = (await guild.populate({ path: "voice_rooms" })).voice_rooms!
    const category = await oldState.guild.channels.cache.get(voiceFromDb.category)!
    const voice_id = voiceFromDb.voice
    const member = oldState.member!

    if (newState.channel && newState.channel.id === voice_id) {
      const channel = await oldState.guild.channels.create({
        name: member.user.username,
        type: ChannelType.GuildVoice,
        parent: category.id,
        permissionOverwrites: [
          {
            id: newState.guild.roles.everyone,
            deny: [PermissionFlagsBits.SendMessages]
          },
          {
            id: member.user,
            allow: [PermissionFlagsBits.SendMessages]
          }
        ]
      })
      await member.voice.setChannel(channel)
    }

    if (oldState.channel && oldState.channel.id != voice_id) {
      if (oldState.channel.members.size == 0) {
        oldState.channel.delete()
      }
    }
  }
}