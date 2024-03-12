import { ButtonInteraction, ChannelType, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { GuildModel } from "../../../../models/Guild";
import { VoiceModel } from "../../../../models/Voice";
import { voiceButton } from "../../../../components/buttons/voice";

export const createPrivateVoiceRooms = async (interaction: ButtonInteraction) => {
  const guild = (await GuildModel.findOne({ guild_id: interaction.guild?.id }))!

  const category = await interaction.guild?.channels.create({
    name: "Vara private rooms",
    type: ChannelType.GuildCategory
  })!

  const text = await interaction.guild?.channels.create({
    name: "Settings",
    type: ChannelType.GuildText,
    parent: category.id,
    permissionOverwrites: [
      {
        id: interaction.guild?.roles.everyone,
        deny: [PermissionFlagsBits.SendMessages]
      },
    ]
  })!

  const voice = await interaction.guild?.channels.create({
    name: "Create",
    type: ChannelType.GuildVoice,
    parent: category.id
  })!

  const embed = new EmbedBuilder()
    .setTitle("Settings")
    .setDescription(`Here you can set up your voice channel\n\n<:edit:1195419164274331648> - Change the channel name\n<:mle4_announcement:1195419206334828567> - Change the maximum number of people in the channel`)
    .setColor(0xFFBCD9)

  await text.send({ embeds: [embed], components: [voiceButton] })

  const voiceFromDatabase = await VoiceModel.create({ category: category.id, voice: voice.id })
  guild.voice_rooms = voiceFromDatabase.id
  guild.save()
}