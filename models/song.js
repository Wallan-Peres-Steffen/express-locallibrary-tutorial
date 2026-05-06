const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SongSchema = new Schema({
  titulo: { type: String, required: true, maxLength: 100 },
  author: { type: String, required: true, maxLength: 100 },
  ano: { type: Date }
});

// Virtual for song's URL
SongSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/song/${this._id}`;
});

// Export model
module.exports = mongoose.model("Song", SongSchema);