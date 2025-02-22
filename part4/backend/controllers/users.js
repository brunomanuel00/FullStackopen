const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (_request, response) => {
    const users = await User.find({}).populate('blogs', {
        title: 1,
        author: 1,
        url: 1,
        likes: 1
    })
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (password.length < 3) {
        return response.status(400).json({ error: "the password is too short" })
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const userSaved = await user.save()
    response.status(201).json(userSaved)
})

module.exports = userRouter