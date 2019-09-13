const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const schema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String }],
    is_system: { type: String, required: true, default: false },
    expiry_date: {
      type: Date,
      required: v => {
        return this.is_system === false;
      }
    }
  },
  {
    collection: "roles",
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

module.exports = mongoose.model("Role", schema);
