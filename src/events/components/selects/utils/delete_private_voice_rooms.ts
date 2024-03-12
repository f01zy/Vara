import { ButtonInteraction } from "discord.js";
import { GuildModel } from "../../../../models/Guild";
import { IPrivateVoiceRooms, VoiceModel } from "../../../../models/Voice";

export const deletePrivateVoiceRooms = async (interaction: ButtonInteraction) => {
  const guild = (await GuildModel.findOne({ guild_id: interaction.guild?.id }))!

  const voiceFromDb: IPrivateVoiceRooms = (await guild.populate({ path: "voice_rooms" })).voice_rooms!
  const category = await interaction.guild?.channels.cache.get(voiceFromDb.category)!
  await VoiceModel.deleteOne({ category: category.id })
  await interaction.guild?.channels.cache.filter(channel => channel.parentId == category.id).forEach(channel => {
    channel.delete()
  })
  category.delete()
  guild.voice_rooms = null
  guild.save()
}