import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  token?: string;
}
const userSchema: Schema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    token: { type: String },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
