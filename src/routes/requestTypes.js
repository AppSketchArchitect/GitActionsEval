const express = require('express');
const RequestType = require('../models/requestType');

const router = express.Router();

// GET /api/request-types : liste tous les types actifs
router.get('/', async (req, res) => {
  try {
    const types = await RequestType.find({ isActive: true });
    res.json(types);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/request-types/:id : récupère un type par ID
router.get('/:id', async (req, res) => {
  try {
    const type = await RequestType.findById(req.params.id);

    if (!type) {
      return res.status(404).json({ message: 'RequestType not found' });
    }

    res.json(type);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid id' });
  }
});

// POST /api/request-types : crée un nouveau type
router.post('/', async (req, res) => {
  try {
    const {
      code,
      name,
      description,
      priority,
      category,
      estimatedResponseTime,
      isActive,
    } = req.body;

    const created = await RequestType.create({
      code,
      name,
      description,
      priority,
      category,
      estimatedResponseTime,
      isActive,
    });

    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid payload' });
  }
});

module.exports = router;
