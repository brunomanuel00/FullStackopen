const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "La enciclopedia",
        author: "Alberto Machado",
        url: "https.cafe.com",
        likes: 5
    },
    {
        title: "La cachorra",
        author: "Piedrita Roco",
        url: "https.roberto.com",
        likes: 5
    }
]

initialUsers = [
    {
        username: "robert",
        name: "Roberto",
        password: "bienvenidos"
    },
    {
        username: "ricard",
        name: "Ricardo",
        password: "longaniza"
    }
]


const nonExistingId = async () => {
    const blog = new Blog({
        title: "Marianita",
        author: 'Rogelio Cruz',
        url: "https.roll.com",
        likes: 10
    })
    await blog.save()
    await blog.deleteOne()

    return note._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}