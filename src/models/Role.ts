import mongoose from "mongoose"

export interface IRole {
  role_id: string
  price: number
  _id: string
}

const RoleSchema = new mongoose.Schema<IRole>({
  role_id: { type: String, required: true },
  price: { type: Number, required: true }
})

export const RoleModel = mongoose.model("Role", RoleSchema)