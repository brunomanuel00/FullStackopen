const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')
let token;

describe('when there is initially some blog saved', () => {

    beforeEach(async () => {

        await Blog.deleteMany({})
        await User.deleteMany({})

        const user = { username: "testuser", name: "Test User", password: "password" };

        const response = await api
            .post('/api/users')
            .send(user);

        const loginResponse = await api
            .post('/api/login')
            .send({ username: user.username, password: user.password });

        token = loginResponse.body.token;

        const blogObjects = helper.initialBlogs
            .map(blog => ({
                ...blog,
                user: response._body.id
            }))

        const promiseArray = blogObjects.map(blog => new Blog(blog).save())
        await Promise.all(promiseArray)

    })



    test('blog are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('the unique identifier property is named id instead of _id', async () => {

        const response = await helper.blogsInDb()

        response.forEach(blog => {
            assert.ok(blog.id, 'El blog debe tener una propiedad id');
            assert.strictEqual(blog._id, undefined, 'El blog no debe tener una propiedad _id');
        });
    })

    test('blog without likes is added', async () => {

        const newBlog = {
            title: "Marianita",
            author: "Ruperto Coco",
            url: "https.roll.com",
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    })

    test('blog addition fails with status 401 if token is not provided', async () => {
        const newBlog = {
            title: "This should fail",
            author: "No Token User",
            url: "https://example.com",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('blog without title or url is not added', async () => {

        const newBlog = {
            author: "Ruperto Coco",
            url: "https.roll.com",
            likes: 143
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    describe('viewing a specific blog', () => {

        test('updating a blog', async () => {

            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]

            const blogUpdate = { likes: 50 }

            const response = await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(blogUpdate)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.strictEqual(response.body.likes, blogUpdate.likes)
        })


        test('a blog can be deleted', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            const author = blogsAtEnd.map(r => r.author)
            assert(!author.includes(blogToDelete.author))

            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
        })

        test('blog deletion fails with status 401 if token is not provided', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(401)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
        })
    })

})

describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {

        const newBlog = {
            title: "La rata robert",
            author: "Pacheco Fernandez",
            url: "https.pacheco.com",
            likes: 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)


        const author = blogsAtEnd.map(r => r.author)

        assert(author.includes('Pacheco Fernandez'))
    })
})



describe('validations for user', () => {

    beforeEach(async () => {
        await User.deleteMany({})

        const usersObjects = helper.initialUsers
            .map(user => new User(user))
        const promiseArray = usersObjects.map(user => user.save())
        await Promise.all(promiseArray)
    })

    test('blog are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

    })

    test('invalid user', async () => {
        const newUsers = [
            { username: "anas", name: "Anastasio", password: "a" },
            { username: "rl", name: "Rolando", password: "alocate" }
        ]

        const response1 = await api
            .post('/api/users')
            .send(newUsers[0])
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response1.body.error, "the password is too short");

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)

        const response2 = await api
            .post('/api/users')
            .send(newUsers[1])
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response2.body.error, "User validation failed: username: Path `username` (`rl`) is shorter than the minimum allowed length (3).");

        assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})