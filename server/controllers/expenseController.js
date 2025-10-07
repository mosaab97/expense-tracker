const Expense = require('../models/Expense');
const HttpError = require('../models/httpError');


const addExpense = async (req, res) => {
  try {
    const user_id = req.user.id;;
    const { description, amount, categoryId, spentAt } = req.body;
    const expense = await Expense.create({ description, amount, spentAt: spentAt, user_id, categoryId: categoryId });
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
    console.log(err)
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
      categoryId: categoryId || expense.categoryId,
      description: description || expense.description,
      amount: amount || expense.amount,
      spentAt: spentAt || expense.spentAt
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
