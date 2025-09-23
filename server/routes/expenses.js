const express = require('express');
const router = express.Router();
const { addExpense, getExpensesByUserId, updateExpenseById, deleteExpenseById } = require('../controllers/expenseController');
const auth = require('../middleware/auth');
const { addExpenseValidation, updateExpenseValidation } = require('../middleware/validation/expenseValidation');
const { validateRequest } = require('../middleware/validation/validateRequest');


router.use(auth)

router.post('/', addExpenseValidation, validateRequest, addExpense);
router.get('/', updateExpenseValidation, validateRequest, getExpensesByUserId);
router.patch('/:id', updateExpenseById);
router.delete('/:id', deleteExpenseById);


module.exports = router;
