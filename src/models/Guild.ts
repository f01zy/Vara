import mongoose from "mongoose"

const GuildSchema = new mongoose.Schema({
  guild_id: { type: String, required: true },
  economy: { type: Boolean, default: false },
  moderation: { type: Boolean, default: false },
  voice_rooms: { type: mongoose.Schema.Types.ObjectId, ref: "Voice", default: null },
  rating: { type: Boolean, default: false },
  shop: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role", default: [] }],
})

export const GuildModel = mongoose.model("Guild", GuildSchema)