const Expense = require('../models/Expense');
const HttpError = require('../models/httpError');


const addExpense = async (req, res) => {
  try {
    const user_id = req.user.id;;
    const spent_at = new Date();
    const { description, amount, category_id } = req.body;
    const expense = await Expense.create({ description, amount, spent_at, user_id, category_id });
    res.status(201).json({ success: true, expense });
  } catch (error) {
    return next(new HttpError('Something went Wrong', 500))
  }
};

const getExpensesByUserId = async (req, res, next) => {
  try {
    const id = req.user.id;
    const expenses = await Expense.findAll({
      where: {
        user_id: id
      }
    })
    return res.status(200).json({ expenses })
  } catch (err) {
    return next(new HttpError('Something went wrong', 500))
  }
}


module.exports = { addExpense, getExpensesByUserId }
