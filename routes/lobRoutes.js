const express = require('express');
const router = express.Router();
const lobController = require('../controllers/lobController');

router.get('/', lobController.getAllLOBs);
router.get('/:id', lobController.getLOBById);
router.post('/', lobController.createLOB);
router.put('/:id', lobController.updateLOB);
router.delete('/:id', lobController.deleteLOB);

module.exports = router;