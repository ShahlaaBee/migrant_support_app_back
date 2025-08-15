const User = require('../models/User')

const GetUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: !!user.isAdmin
    });
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong', error: error.message });
  }
}

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Something went wrong', error: error.message })
  }
}

const PromoteUser = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }
    if (user.isAdmin) {
      return res.status(400).json({ msg: 'User is already an admin' })
    }
    user.isAdmin = true
    await user.save()
    res.json({
      msg: 'User has been promoted to admin',
      user: {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Server error', error: error.message })
  }
}

module.exports = {
  GetUser,
  GetAllUsers,
  PromoteUser
}