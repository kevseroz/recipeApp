const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    ingredients: {
        required: true,
        type: [{amount: String, measurement: String, name: String}]
    },
    description: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Data', dataSchema)
