const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper.js')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('max likes', () => {
        const list = [
            {
                title: "string reduction",
                author: "Edsger W. Dijkstra",
                likes: 9
            },
            {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 12
            },
            {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 6
            },
            {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 4
            }]
        const result = listHelper.favoriteBlog(list)
        assert.deepStrictEqual(result,
            {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 12
            })

    })

    test('max blogs author', () => {
        const list = [
            {
                title: "string reduction",
                author: "Robert C. Martin",
                likes: 9
            },
            {
                title: "Este no es mi mundo",
                author: "Analio Cortalo",
                likes: 12
            },
            {
                title: "Viaje Profundo",
                author: "Robert C. Martin",
                likes: 6
            },
            {
                title: "OFNI",
                author: "Robert C. Martin",
                likes: 4
            },
            {
                title: "Nadaremos",
                author: "Chovaski Loreal",
                likes: 14
            }]
        const result = listHelper.mostBlogs(list)
        assert.deepStrictEqual(result, {
            author: "Robert C. Martin",
            blogs: 3
        }
        )

    })

    test('max likes author', () => {
        const list = [
            {
                title: "string reduction",
                author: "Robert C. Martin",
                likes: 9
            },
            {
                title: "Este no es mi mundo",
                author: "Analio Cortalo",
                likes: 12
            },
            {
                title: "Viaje Profundo",
                author: "Robert C. Martin",
                likes: 6
            },
            {
                title: "OFNI",
                author: "Robert C. Martin",
                likes: 4
            },
            {
                title: "Nadaremos",
                author: "Chovaski Loreal",
                likes: 14
            }]

        const result = listHelper.mostLikes(list)
        assert.deepStrictEqual(result, {
            author: "Chovaski Loreal",
            likes: 14
        })
    })
})