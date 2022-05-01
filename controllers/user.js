const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

// user register
exports.register = async (req, res) => {
  const body = req.body

  const saltsRound = 10
  const hashedPassword = await bcrypt.hash(body.password, saltsRound)

  const newUser = new User({
    username: body.username,
    name: body.name,
    email: body.email,
    password: hashedPassword
  })

  const savedUser = await newUser.save()

  res.json(savedUser)
}


// user login
exports.login = async (req, res) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (!existingUser) {
    return res.status(404).json({ message: 'User does not exit' })
  }

  const correctPassword = await bcrypt.compare(password, existingUser.password)
  if (!correctPassword) {
    return res.status(400).json({ message: 'Invalid Credentials' })
  }

  const token = jwt.sign({ username: existingUser.username, email: existingUser.email, id: existingUser._id }, config.SECRET, { expiresIn: "24h" })
  res.status(200).json({ result: existingUser, token })
}


// get login users
exports.getUsers = async (req, res) => {
  const users = await User.find({})
  res.json(users)
}
