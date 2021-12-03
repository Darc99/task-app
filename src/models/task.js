const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    description : {
        type: String,
        required: true,
        trim: true
    },
    completed : {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //'User' same model name found in user model
        ref: 'User'
    }
});

module.exports = Task