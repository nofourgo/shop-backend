const mongoose = require("mongoose");

const TypeOfSchema = new mongoose.Schema({
  value: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("TypeOf", TypeOfSchema);
