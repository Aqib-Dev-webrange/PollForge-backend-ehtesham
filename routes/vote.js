const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const VoteTemp = require('../models/VoteTemp');

router.post('/', async (req, res) => {
  const { poll_id, option_id } = req.body;
  const user_agent = req.headers['user-agent'];
  const vote_hash = crypto.createHash('sha256').update(user_agent + poll_id).digest('hex');

  const existingVote = await VoteTemp.findOne({ vote_hash, poll_id });
  if (existingVote) {
    return res.status(400).json({ message: 'Duplicate vote detected.' });
  }

  const vote = new VoteTemp({ poll_id, option_id, user_agent, vote_hash });
  await vote.save();
  res.status(201).json({ message: 'Vote recorded.' });
});

module.exports = router;
