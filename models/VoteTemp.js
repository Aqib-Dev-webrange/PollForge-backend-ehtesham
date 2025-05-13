const mongoose = require('mongoose');

const voteTempSchema = new mongoose.Schema({
  poll_id: String,
  option_id: String,
  user_agent: String,
  vote_hash: String,
  timestamp: { type: Date, default: Date.now },
  synced_at: { type: Date, default: null }
});

module.exports = mongoose.model('VoteTemp', voteTempSchema);
