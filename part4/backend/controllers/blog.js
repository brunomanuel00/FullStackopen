const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

//LIBRERIA "express-async-errors" esto es para no tener que usar el bloque try/catch
// La librería se encarga de todo lo que hay debajo del capó. 
// Si ocurre una excepción en una ruta async, la ejecución se pasa automáticamente 
// al middleware de manejo de errores.

//Get all blogs
blogsRouter.get('/', async (_request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
})

// //Get blog by id
blogsRouter.get('/:id', async (request, response) => {

    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.status(200).json(blog)
    } else {
        return response.status(404).json({ error: 'Blog not found' });
    }

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    } else {
        return response.status(401).json({ error: 'You do not have the required authorization' })
    }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {

    const { title, author, url, likes } = request.body;

    const user = request.user

    if (!title || !author) {
        return response.status(400).json({ error: 'content is missing' });
    }

    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
        return response.status(400).json({ error: 'title must be unique' });
    }

    const blog = new Blog({ title, author, url, likes, user: user._id });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog);
});

// //Put blog
blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes },
        { new: true, runValidators: true, context: 'query' }
    );

    if (!updatedBlog) {
        return response.status(404).json({ error: 'Blog not found' });
    }

    response.json(updatedBlog);
});



module.exports = blogsRouter