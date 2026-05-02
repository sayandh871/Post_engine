import mongoose from "mongoose";
import bcrypt from "bcrypt"

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: string,
      required: true,
      
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: string,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: { type: string, required: true, minlength: 6 },
    role: { type: string, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true },
);

const saltRounds = 10;

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model("User",userSchema);