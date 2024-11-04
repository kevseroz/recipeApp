const express = require('express');
const Message = require('../models/message');
const Data = require('../models/model');
const authMiddleware = require('../middlewares/authMiddleware');
require('dotenv').config();

const router = express.Router();

router.post('/add', authMiddleware,  async (req, res) => {
    const { content, dataId } = req.body;
    try {
        const data = await Data.findById(dataId);
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }
        const message = new Message({
            content,
            user: req.user.id,
            data: dataId
        });
        await message.save()
        await Data.findByIdAndUpdate(dataId, { $push: { messages: message._id } }, { new: true });
        return res.status(201).json({ message: 'Message saved successfully!', messageId: message._id });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

})

module.exports = router;
