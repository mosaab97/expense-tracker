const { checkSchema } = require('express-validator');

const basicUserValidation = checkSchema({
  email: {
    isEmail: true,
  },
  password: {
    notEmpty: true,
    isLength: {
      options: {
        min: 6
      }
    }
  }
})

module.exports = { basicUserValidation }
