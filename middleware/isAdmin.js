
const isAdmin = (req, res, next) => {
  try {

    if (req.user && req.user.isAdmin) {
      return next()
    } else {

      return res.status(403).json({ msg: 'Access denied. Admins only.' })
    }
  } catch (error) {

    console.error('error:', error)
    res.status(500).json({ msg: 'error' })
  }
}

module.exports = isAdmin
