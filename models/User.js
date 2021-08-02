const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');



const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});
  // set this to use virtual below


const User = model('User', userSchema);

module.exports = User;
