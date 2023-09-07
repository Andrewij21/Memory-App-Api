const { model, Schema } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    date: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required:true
    },
    description: {
      type: String,
      // required:true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("album", schema);
