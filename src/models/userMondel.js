const { model, Schema } = require("mongoose");

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2000,
    },
    Admin: Number,
  },
  refreshToken: {
    type: String,
  },
});

module.exports = model("user", schema);
