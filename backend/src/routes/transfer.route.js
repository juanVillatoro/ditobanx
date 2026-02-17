const express = require('express');
const transferController = require('../controllers/transfer.controller');

const validate = require('../middlewares/validate.middleware');
const transferCreateSchema = require('../schemas/transfer.schema');

const router = express.Router();

router.post('/', validate(transferCreateSchema), transferController.createTransfer);

module.exports = router;