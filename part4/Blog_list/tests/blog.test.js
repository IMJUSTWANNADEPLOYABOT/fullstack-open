const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
    let token
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})

        const users = await User.insertMany(helper.initialUsers)
        const kitten = users.find(u => u.username === 'kitten')

        const blogsToInsert = helper.initialBlogs.map(blog => ({
            ...blog,
            user: kitten._id
        }))
        await Blog.insertMany(blogsToInsert)

        const login = await api
            .post('/api/login')
            .send({ username: 'kitten', password: 'password123' })

        token = login.body.token
    })

    test('correct amount and format', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('note has id instead _id', async () => {
        const response = await api.get('/api/blogs')

        assert.ok(response.body[0].id, 'wrong id')
    })

    test('saving blog post and check the length', async () => {
        const newBlogPost = {
            title: 'About LOTR',
            author: 'Alexander',
            url: 'https://books.com/the-lord-of-the-rings.pdf',
            likes: 155,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlogPost)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsCurrent = await helper.blogsInDb()
        assert.strictEqual(blogsCurrent.length, helper.initialBlogs.length + 1)

        const payload = blogsCurrent.map((i) => i.title)
        assert(payload.includes('About LOTR'))
    })

    test('saving blog without likes', async () => {
        const blogWithZeroLike = {
            title: 'how te be a unique',
            author: 'D. Trump',
            url: 'https://books.com/how-to-be-unique.pdf',
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blogWithZeroLike)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.likes, 0)
    })

    test('saving blog without title', async () => {
        const invalidBlog = {
            author: 'J.R. Tolkien',
            url: 'https://books.com/the-lord-of-the-rings.pdf',
            likes: 155,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidBlog)
            .expect(400)
    })

    test('saving blog without url', async () => {
        const invalidBlog = {
            title: 'The Lord of the Rings',
            author: 'J.R. Tolkien',
            likes: 155,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidBlog)
            .expect(400)
    })

    test('saving blog without token', async () => {
        const blog = {
            title: 'The Lord of the Rings',
            author: 'J.R. Tolkien',
            url: 'example.com',
            likes: 155,
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(401)
    })

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(204)

            const blogAtEnd = await helper.blogsInDb()

            const titles = blogAtEnd.map((i) => i.title)
            assert(!titles.includes(blogToDelete.title))

            assert.strictEqual(blogsAtStart.length, blogAtEnd.length + 1)
        })
    })

    describe('update an blog post', () => {
        test('succes updating', async () => {

            const blogList = await helper.blogsInDb()
            const blogToUpdate = blogList[0]

            const updatedBlog = {
                ...blogToUpdate,
                likes: blogToUpdate.likes + 1
            }

            const resultBlogPost = await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.strictEqual(resultBlogPost.body.likes, blogToUpdate.likes + 1)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})