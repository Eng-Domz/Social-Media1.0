const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    userid: {
        type: String,  // Changed from Number to String to match MongoDB ObjectId
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    comments: {
        type: Array,
        required: true
    },
    liked:{
        type: Boolean,
        required: true
    },
    imgUrl:{
        type: String
    }
}, {timestamps: true})
module.exports = mongoose.model('Post', postSchema);