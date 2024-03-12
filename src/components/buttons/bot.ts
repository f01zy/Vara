import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

const INVITE = "https://discord.com/oauth2/authorize?client_id=1183731050891989032&permissions=8&scope=bot+applications.commands"

export const botButton: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setURL(INVITE)
    .setLabel("Invite")
)