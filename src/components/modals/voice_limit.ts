import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js"

const modal = new ModalBuilder()
  .setTitle("limit")
  .setCustomId("user_limit")

const name = new TextInputBuilder()
  .setCustomId("limit")
  .setLabel("limit")
  .setRequired(true)
  .setStyle(TextInputStyle.Short)

const row: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>().addComponents(name)

modal.addComponents(row)

export const voiceLimitModal = modal