const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('when smth with the users or login process', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(helper.initialUsers)
    })

    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct user saved in database', async () => {
        const userAtStart = await helper.usersInDb()

        const user = {
            username: 'Portugal Lover',
            name: 'Erich',
            password: 'gogoportugal'
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(201)

        const userAtEnd = await helper.usersInDb()
        assert.strictEqual(userAtStart.length + 1, userAtEnd.length)
    })

    test('fails with 400 if username do not unique', async () => {
        const userAtStart = await helper.usersInDb()

        const user = {
            username: 'andrewha',
            name: 'Erich',
            password: 'gogoportugal'
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)

        const userAtEnd = await helper.usersInDb()
        assert.strictEqual(userAtStart.length, userAtEnd.length)
    })

    test('fails with short password', async () => {
        const userAtStart = await helper.usersInDb()

        const user = {
            username: 'Hot Dog Eater',
            name: 'Erich',
            password: '12'
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)

        const userAtEnd = await helper.usersInDb()
        assert.strictEqual(userAtStart.length, userAtEnd.length)
    })

    test('a valid blog can be added by authorized user', async () => {

        const userAtStart = await helper.usersInDb()

        await api
            .post('/api/users')
            .send({ username: 'supertest', password: '123qwerty' })
            .expect(201)

        const login = await api
            .post('/api/login')
            .send({ username: 'supertest', password: '123qwerty' })

        const token = login.body.token

        const newBlogPost = {
            title: 'A npm libriaries',
            author: 'supertest',
            url: 'supertest.com',
            likes: 6534,

        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlogPost)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await helper.usersInDb()
        assert.strictEqual(userAtStart.length + 1, userAtEnd.length)
    })

})

after(async () => {
    await mongoose.connection.close()
})