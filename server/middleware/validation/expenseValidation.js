const { checkSchema } = require('express-validator');

const addExpenseValidation = checkSchema({
  categoryId: {
    notEmpty: {
      errorMessage: "Category is required",
    },
    isIn: {
      options: [[1, 2, 3]],
      errorMessage: "Category must be one of [1, 2, 3]",
    },
  },
  description: {
    notEmpty: {
      errorMessage: "Description is required",
    },
    isString: {
      errorMessage: "Description must be a string",
    },
  },
  spentAt: {
    notEmpty: {
      errorMessage: "Date is required",
    },
    isISO8601: {
      errorMessage: "Invalid date format",
    },
  },
  amount: {
    notEmpty: {
      errorMessage: "Amount is required",
    },
    isDecimal: {
      errorMessage: "Amount must be a decimal",
    },
  },
});

const updateExpenseValidation = checkSchema({
  categoryId: {
    optional: true,
    isIn: {
      options: [[1, 2, 3]],
      errorMessage: "Category must be one of [1, 2, 3]",
    },
  },
  description: {
    optional: true,
    isString: {
      errorMessage: "Description must be a string",
    },
  },
  spentAt: {
    optional: true,
    isISO8601: {
      errorMessage: "Invalid date format",
    },
  },
  amount: {
    optional: true,
    isDecimal: {
      errorMessage: "Amount must be a decimal",
    },
  },
});


module.exports = { addExpenseValidation, updateExpenseValidation }
