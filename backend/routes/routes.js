const express = require('express');
const Model = require('../models/model');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()

const authRoutes = require('./auth');

router.use('/auth', authRoutes);

router.post('/add-recipe', authMiddleware, async (req, res) => {
    const data = new Model({
        name: req.body.name,
        ingredients: req.body.ingredients,
        description: req.body.description,
        author: req.user.id
    })
    try {
        const savedData = await data.save();
        res.status(200).json(savedData)
    }
    catch (err) {
        res.status(400).json({message: err})
    }
})

router.get('/recipes', async (req, res) => {
    try {
        const data = await Model.find();
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({message: err})
    }
})

router.get('/get-recipe/:id', async (req, res) => {
    try {
        const recipe = await Model.findById(req.params.id);
        res.status(200).json(recipe)
    }
    catch (err) {
        res.status(500).json({message: err})
    }
})

router.put('/update-recipe/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const recipe = await Model.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (req.user.id !== recipe.author.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this recipe' });
        }

        const result = await Model.findByIdAndUpdate(id, updatedData, options);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/delete-recipe/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const recipe = await Model.findById(id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (req.user.id !== recipe.author.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this recipe' });
        }

        await Model.findByIdAndDelete(id);
        res.status(200).json({ message: 'Recipe deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;
