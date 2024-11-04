const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Data',
        required: true
    }
});

module.exports = mongoose.model('Message', messageSchema);
