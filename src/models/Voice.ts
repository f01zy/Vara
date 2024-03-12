import mongoose from "mongoose"

export type IPrivateVoiceRooms = {
  category: string,
  voice: string
}

const VoiceSchema = new mongoose.Schema<IPrivateVoiceRooms>({
  category: { type: String, required: true },
  voice: { type: String, required: true }
})

export const VoiceModel = mongoose.model("Voice", VoiceSchema)