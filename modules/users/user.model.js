const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    username: { type: String, unique: true },
    password: { hash: { type: String, required: true }, salt: String },
    service_id: [{ type: String, unique: true }],
    roles: [{ type: String }],
    is_active: { type: Boolean, required: true, default: true },
    phone: String
  },
  {
    collection: "users",
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

module.exports = mongoose.model("User", schema);
