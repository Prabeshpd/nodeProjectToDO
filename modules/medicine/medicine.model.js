const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: ObjectId, required: true, ref: "User" },
    type: { type: String, required: true, enum: ["tablet", "syrup", "inhaler", "in_solution"] },
    frequency: { type: Number, required: true },
    is_active: { type: Boolean, required: true, default: true },
    intake_time: { type: Date, required: time }
  },
  {
    collection: "medicines",
    timeStamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: { virtuals: true },
    toJson: { virtuals: true }
  }
);

module.exports = mongoose.model("Medicine", schema);
