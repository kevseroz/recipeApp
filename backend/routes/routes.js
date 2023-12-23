const express = require('express');
const Model = require('../models/model');

const router = express.Router()

router.post('/add-recipe', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        ingredients: req.body.ingredients,
        description: req.body.description,
        author: req.body.author
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
        const data = await Model.findById(req.params.id);
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({message: err})
    }
})

router.put('/update-recipe/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/delete-recipe/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedData = await Model.findByIdAndDelete(id);

        res.send(deletedData)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;
