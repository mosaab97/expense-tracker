const bcrypt = require('bcrypt');
const User = require("../models/User");

const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email: email } })
}

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
}

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    const isValidPass = await bcrypt.compare(password, user.password_hash)
    if (!isValidPass) return res.status(401).json({ Message: 'invalid use/pass' })
    res.status(200).json({ message: 'login in success', user })
  } catch (err) {
    return res.status(500).json({ Message: 'something went wrong' })
  }

}

const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const user = await getUserByEmail(email)

    if (user) {
      return res.status(400).json({ message: 'user already exist' })
    }
    const hashedPass = await hashPassword(password);
    const newUser = await User.create({ name, email, password_hash: hashedPass })
    res.status(201).json({ message: 'sign up success', newUser })
  } catch (err) {
    return res.status(500).json({ Message: 'something went wrong' })
  }

}


module.exports = { login, signup }
