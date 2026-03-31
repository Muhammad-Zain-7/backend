const express = require('express');
const { games } = require('../data/games');

const router = express.Router();

// GET /api/games — list all games (supports ?genre= and ?search= filters)
router.get('/', (req, res) => {
  let result = [...games];

  if (req.query.genre) {
    result = result.filter(
      (g) => g.genre.toLowerCase() === req.query.genre.toLowerCase()
    );
  }

  if (req.query.search) {
    const q = req.query.search.toLowerCase();
    result = result.filter((g) => g.title.toLowerCase().includes(q));
  }

  res.json({ games: result, total: result.length });
});

// GET /api/games/:id — get single game
router.get('/:id', (req, res) => {
  const game = games.find((g) => g.id === req.params.id);
  if (!game) return res.status(404).json({ error: 'Game not found' });
  res.json(game);
});

module.exports = router;
