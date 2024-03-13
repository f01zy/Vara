import { Client, Events } from "discord.js";
import { register } from "../../utils/register";
import path from "path";

export const type = Events.ClientReady

export const once = true

export const execute = async (client: Client) => {
  let guilds = 0
  client.guilds.cache.forEach(guild => {
    guilds++
    const members = guild.members.cache;
    members.forEach(async member => {
      if (member.user.bot) return
      register(member.id, member.guild.id, member.user.username)
    });
  });

  const avatar = path.join("avatar.gif")

  client.user?.setAvatar(avatar)

  console.log("[INFO] BOT READY.");
}