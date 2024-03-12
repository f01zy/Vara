import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  discord_id: { type: String, required: true },
  balance: { type: Number, required: true },
  bank: { type: Number, required: true },
  guild: { type: String, required: true },
  work_time: { type: Date, default: new Date() },
  crime_time: { type: Date, default: new Date() },
  rating: { type: Number, default: 0 },
  level: { type: Number, default: 1 }
})

export const UserModel = mongoose.model("User", UserSchema)