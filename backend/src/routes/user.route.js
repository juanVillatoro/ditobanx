const express = require('express');
const router = express();

const userCreateSchema = require('../schemas/user.schema');
const validate = require('../middlewares/validate.middleware')

const userController = require('../controllers/user.controller');

router.post('/', validate(userCreateSchema), userController.createUser);
router.get('/', userController.getAllUsers);

module.exports = router;