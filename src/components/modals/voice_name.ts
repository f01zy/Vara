import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js"

const modal = new ModalBuilder()
  .setTitle("name")
  .setCustomId("channel_name")

const name = new TextInputBuilder()
  .setCustomId("name")
  .setLabel("name")
  .setRequired(true)
  .setStyle(TextInputStyle.Short)

const row: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>().addComponents(name)

modal.addComponents(row)

export const voiceNameModal = modal