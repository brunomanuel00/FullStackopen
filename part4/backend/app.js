const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = config.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)

    .then(_result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.morganMiddleware)
app.use(middleware.tokenExtractor)


app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app



// const express = require('express')
// const app = express()
// const cors = require('cors')
// const mongoose = require('mongoose')

// const blogSchema = new mongoose.Schema({
//     title: String,
//     author: String,
//     url: String,
//     likes: Number
// })

// const Blog = mongoose.model('Blog', blogSchema)

// const mongoUrl = 'mongodb://localhost/bloglist'
// mongoose.connect(mongoUrl)

// app.use(cors())
// app.use(express.json())


// const PORT = 3003
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })