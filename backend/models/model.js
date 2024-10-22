const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    ingredients: {
        required: true,
        type: [{ amount: String, measurement: String, name: String }]
    },
    description: {
        required: true,
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Data', dataSchema);
