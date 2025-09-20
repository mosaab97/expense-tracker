const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require("../models/User");
const HttpError = require('../models/httpError');

const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email: email } })
}

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
}

const generateToken = async (user) => {
  return await jwt.sign({ id: user.id, email: user.email, name: user.name }, 'key', { expiresIn: '1h' })
}

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return next(new HttpError('user not found', 404))
    }
    const isValidPass = await bcrypt.compare(password, user.password_hash)
    if (!isValidPass) return next(new HttpError('Invalid User/Pass', 401))
    const token = await generateToken(user);
    res.status(200).json({ user: { id: user.id, email: user.email, name: user.name }, token })
  } catch (err) {
    return next(new HttpError('Something went wrong', 500))
  }

}

const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const user = await getUserByEmail(email)

    if (user) {
      return next(new HttpError('user already exist', 400))
    }
    const hashedPass = await hashPassword(password);
    const newUser = await User.create({ name, email, password_hash: hashedPass });
    const token = await generateToken(newUser);
    res.status(201).json({ token, user: { id: newUser.id, email: newUser.email, name: newUser.name } })
  } catch (err) {
    return next(new HttpError('Something went wrong', 500))
  }

}


module.exports = { login, signup }
