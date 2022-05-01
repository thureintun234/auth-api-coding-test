const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const auth = async (req, res, next) => {
  try {
    // get token after the 'bearer '

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(400).json({ error: 'Not Authorized to see user list! Please Login!' })
    }

    const isCustomToken = token.length < 500

    let decodedData

    if (token && isCustomToken) {
      decodedData = jwt.verify(token, config.SECRET)

      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token)
      req.userId = decodedData?.sub
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = auth