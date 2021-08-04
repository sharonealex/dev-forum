const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true
    },
    name: {
      type: String,//retain post choice if user deletes his account?
    },
    avatar: {
        type: String
    },
    likes: [
        {
            user: {  //to know which all users are liking it.
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});
 


const Post = mongoose.model('post', postSchema);

module.exports = Post;
