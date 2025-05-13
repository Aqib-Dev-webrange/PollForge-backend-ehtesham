const express = require('express');
const router = express.Router();
const { syncVotes } = require('../controllers/syncController');

router.post('/', syncVotes);

module.exports = router;
