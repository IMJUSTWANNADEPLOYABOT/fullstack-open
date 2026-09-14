const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    if (!user) {
        return response.status(401).json({ error: 'userId missing or not valid' })
    }

    if (!body.title || !body.url) {
        return response.status(400).end()
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    const savedBlog = await blog.save()

    const blogToReturn = await Blog.findById(savedBlog._id)
        .populate('user', { username: 1, name: 1 })

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(blogToReturn)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

    const user = request.user
    if (!user) return response.status(401).json({ error: 'token missing or invalid' })

    const blog = await Blog.findById(request.params.id)
    if (!blog) return response.status(404).json({ error: 'Blog not found' })

    if (blog.user.toString() !== user.id.toString()) return response.status(401).json({ error: 'Only creator can delete this blog' })

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body

    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1, id: 1 })

    if (!blog) {
        return response.status(404).end()
    }

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const savedBlog = await blog.save()
    response.json(savedBlog)
})

module.exports = blogsRouter