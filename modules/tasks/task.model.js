const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: ObjectId, required: true, ref: "User" },
    is_active: { type: Boolean, required: true, default: false },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true }
  },
  {
    collection: "tasks",
    timeStamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    toObject: {
      virtuals: true
    },
    toJson: {
      virtuals: true
    }
  }
);

module.exports = mongoose.model("Task", schema);
