const User = require('../models/User')
const middleware = require('../middleware')

const Register = async (req, res) => {
  const { email, password, name } = req.body
  try {
    let passwordDigest = await middleware.hashPassword(password)
    let existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ msg: 'A user with that email has already been registered!' })
    } else {
      const user = await User.create({
        email,
        password: passwordDigest,
        name, 
        isAdmin: false 
      })

      const payload = {
        _id: user._id, 
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin
      }
      const token = middleware.createToken(payload)

      res.status(201).json({
        msg: 'User registered successfully',
        user: payload,
        token 
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: 'Registration error',
      error: error.message
    })
  }
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }
    const matched = await middleware.comparePassword(password, user.password)
    if (!matched) {
      return res.status(401).json({ msg: 'Invalid password' })
    }
 
    const payload = {
      _id: user._id, 
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin 
    }
    const token = middleware.createToken(payload)
    res.status(200).json({
      msg: 'Login successful',
      user: payload,
      token
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Login error', error: error.message })
  }
}

module.exports = {
  Register,
  Login
}