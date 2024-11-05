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

router.put('/edit/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        if (message.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        await Message.findByIdAndUpdate(id, { content}, { new: true });
        return res.status(200).json({ message: 'Message updated successfully!' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
})

router.delete('/delete/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const message = await Message.findById(id);

        if (!message) {
            return res.status(404).json({message: 'Message not found'});
        }

        const recipe = await Data.findById(message.data);
        if (!recipe) {
            return res.status(404).json({message: 'Recipe not found'});
        }

        const isMessageOwner = message.user.toString() === req.user.id;
        const isRecipeOwner = recipe.author.toString() === req.user.id;

        if (!isMessageOwner && !isRecipeOwner) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        await Message.findByIdAndDelete(id);
        await Data.findByIdAndUpdate(message.data, {$pull: {messages: id}}, {new: true});
        return res.status(200).json({message: 'Message deleted successfully!'});
    }
    catch (err) {
        res.status(500).json({message: err});
    }

})

module.exports = router;
