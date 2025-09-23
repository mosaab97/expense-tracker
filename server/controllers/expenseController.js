const Expense = require('../models/Expense');
const HttpError = require('../models/httpError');


const addExpense = async (req, res) => {
  try {
    const user_id = req.user.id;;
    const { description, amount, categoryId, spentAt } = req.body;
    const expense = await Expense.create({ description, amount, spent_at: spentAt, user_id, category_id: categoryId });
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

const updateExpenseById = async (req, res, next) => {
  try {
    const { description, categoryId, amount, spentAt } = req.body
    const user_id = req.user.id;
    const expenseId = req.params.id;
    const expense = await Expense.findByPk(expenseId)
    if (!expense) return next(new HttpError('Expense Not Found', 404))
    if (expense.user_id !== user_id) return next(new HttpError('Not Authorized', 401));

    const updatedExpense = {
      category_id: categoryId || expense.category_id,
      description: description || expense.description,
      amount: amount || expense.amount,
      spent_at: spentAt || expense.spent_at
    }
    const results = await expense.update(updatedExpense, {
      where: {
        id: expenseId
      }
    })
    return res.status(200).json({ results })
  } catch (err) {
    return next(new HttpError('Something went wrong', 500))
  }
}

const deleteExpenseById = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const expenseId = req.params.id;
    const expense = await Expense.findByPk(expenseId)
    if (!expense) return next(new HttpError('Expense Not Found', 404))
    if (expense.user_id !== user_id) return next(new HttpError('Not Authorized', 401));

    const results = await expense.destroy({
      where: {
        id: expenseId
      }
    })
    return res.status(200).json({ results })
  } catch (err) {
    return next(new HttpError('Something went wrong', 500))
  }
}


module.exports = { addExpense, getExpensesByUserId, updateExpenseById, deleteExpenseById }
