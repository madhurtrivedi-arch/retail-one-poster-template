const express = require('express');
const router = express.Router();
const { fetchPosterData } = require('../services/salescode');

const lobConfig = {
  havells: { division: "HAVELLS" },
  emami: { division: "EMAMI" }
};

router.get('/poster/:lob', async (req, res) => {
  try {
    const config = lobConfig[req.params.lob];

    if (!config) {
      return res.status(400).json({ error: "Invalid LOB. Available: havells, emami" });
    }

    const data = await fetchPosterData(config);
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = router;
