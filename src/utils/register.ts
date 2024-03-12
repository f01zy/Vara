import { UserModel } from "../models/User";

const cooldown = 4 * 60 * 60 * 1000

export const register = async (member_id: string, guild_id: string, username: string) => {
  const user = await UserModel.findOne({ discord_id: member_id, guild: guild_id })

  if (!user) {
    await UserModel.create({ discord_id: member_id, balance: 5000, bank: 0, guild: guild_id })
    console.log(`[INFO] THE USER ${username} HAS BEEN REGISTERED.`);
  }
}