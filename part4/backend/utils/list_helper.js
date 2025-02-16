const _ = require('lodash')

const dummy = array => {
    return 1;
}

const totalLikes = array => {

    const reducer = array.reduce((accumulate, item) => {
        return accumulate + item.likes
    }, 0)

    return array.length > 0 ? reducer : 0

}

const favoriteBlog = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return null
    }

    const favorite = blogs.reduce((maxBlog, currentBlog) => {
        return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog
    }, blogs[0])

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}


const mostBlogs = blogs => {

    if (!blogs || blogs.length === 0) {
        return null
    }

    const orderBlogsByName = _.groupBy(blogs, 'author')

    const authorsWithCount = _.map(orderBlogsByName, (blog, author) => ({
        author: author,
        blogs: blog.length
    }))

    return _.maxBy(authorsWithCount, 'blogs')
}

const mostLikes = blogs => {
    if (!blogs || blogs.length === 0) {
        return null
    }

    const authorsWithLikes = blogs.map(item => ({
        author: item.author,
        likes: item.likes
    }))

    return _.maxBy(authorsWithLikes, 'likes')

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}