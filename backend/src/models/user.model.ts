import { Schema, model } from "mongoose";

const favoriteSchema = new Schema(
  {
    trackId: { type: String, required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    image: { type: String },
    audio: { type: String }
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    favorites: {
      type: [favoriteSchema],
      default: []
    }
  },
  { timestamps: true }
);

userSchema.index({ "favorites.trackId": 1 });

export const User = model("User", userSchema);
