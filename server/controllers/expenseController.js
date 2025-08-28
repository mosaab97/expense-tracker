const Expense = require('../models/Expense');


exports.addExpense = async (req, res) => {
try {
const { description, amount, spent_at, user_id, category_id } = req.body;
const expense = await Expense.create({ description, amount, spent_at, user_id, category_id });
res.status(201).json({ success: true, expense });
} catch (error) {
res.status(500).json({ success: false, error: error.message });
}
};