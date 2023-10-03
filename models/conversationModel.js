const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conversationSchema = mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
