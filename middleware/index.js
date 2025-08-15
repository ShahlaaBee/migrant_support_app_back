const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User') 

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const APP_SECRET = process.env.APP_SECRET

const hashPassword = async (password) => {
  let hashPassword = await bcrypt.hash(password, SALT_ROUNDS)
  return hashPassword
}

const comparePassword = async (password, storedPassword) => {
  let passwordMatch = await bcrypt.compare(password, storedPassword)
  return passwordMatch
}

const createToken = (payload) => {
  let token = jwt.sign(payload, APP_SECRET)
  return token
}

const stripToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
    const token = authHeader.split(' ')[1]
    if (token) {
      res.locals.token = token
      return next()
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'Strip Token Error!' })
  }
}

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ msg: 'Token missing' })
    const decoded = jwt.verify(token, APP_SECRET)
    const user = await User.findById(decoded._id)
    if (!user) return res.status(401).json({ msg: 'User not found' })
    req.user = user
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' })
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  stripToken,
  verifyToken
}