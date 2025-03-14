const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController'); // Import the music controller

// GET route to list music files
router.get('/', musicController.getMusicList);

// GET route to stream a specific music file
router.get('/music-content/:id', musicController.streamMusicFile);

module.exports = router; 