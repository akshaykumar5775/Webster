const mongoose = require('mongoose');
const User = require('./User');

const UserPost = new mongoose.Schema({
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
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                default: null
            },
            company: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'companies',
                default: null
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
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
});


const userPost = mongoose.model('userpost', UserPost);
module.exports = userPost;