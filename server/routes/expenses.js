const express = require('express');
const router = express.Router();
const { addExpense, getExpensesByUserId } = require('../controllers/expenseController');
const auth = require('../middleware/auth')


router.use(auth)

router.post('/', addExpense);
router.get('/', getExpensesByUserId);


module.exports = router;
