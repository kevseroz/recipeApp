const express = require('express');

const router = express.Router()

const authRoutes = require('./auth');
const recipeRoutes = require('./recipe');
const messageRoutes = require('./message');

router.use('/', recipeRoutes);
router.use('/auth', authRoutes);
router.use('/message', messageRoutes);


module.exports = router;
