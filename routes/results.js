const express = require('express');
const router = express.Router();
const VoteTemp = require('../models/VoteTemp');

// GET /api/votes/:poll_id
router.get('/:poll_id', async (req, res) => {
  const { poll_id } = req.params;

  try {
    const aggregation = await VoteTemp.aggregate([
      { $match: { poll_id } },
      {
        $group: {
          _id: "$option_id",
          count: { $sum: 1 },
        },
      },
    ]);

    const results = {};
    aggregation.forEach(entry => {
      results[entry._id] = entry.count;
    });

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch results" });
  }
});

module.exports = router;
