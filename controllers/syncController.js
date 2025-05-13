const { Pool } = require('pg');
const VoteTemp = require('../models/VoteTemp');

const pool = new Pool({
  connectionString: process.env.POSTGRESQL_URI
});

const syncVotes = async (req, res) => {
  const unsyncedVotes = await VoteTemp.find({ synced_at: null });
  let inserted = 0, skipped = 0;

  for (const vote of unsyncedVotes) {
    try {
      await pool.query(
        `INSERT INTO votes (id, poll_id, option_id, vote_hash, timestamp)
         VALUES ($1, $2, $3, $4, $5)`,
        [vote._id.toString(), vote.poll_id, vote.option_id, vote.vote_hash, vote.timestamp]
      );
      vote.synced_at = new Date();
      await vote.save();
      inserted++;
    } catch (err) {
      if (err.code === '23505') skipped++; // Unique violation
    }
  }

  res.json({ inserted, skipped });
};

module.exports = { syncVotes };
