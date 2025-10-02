const express = require('express');
const router = express.Router();
const multer = require('multer');
const policyController = require('../controllers/policyController');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), policyController.uploadCSV);
router.get('/search', policyController.searchPolicyByUsername);
router.get('/aggregate', policyController.aggregatePoliciesByUser);

module.exports = router;
