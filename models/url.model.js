const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  original: { type: String, required: true }
  // short: { type: String, required: true }
});

urlSchema.plugin(autoIncrement.plugin, { model: "Url", field: "short" });

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
