const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
    {
        title: 'How become a billioner',
        author: 'Robert Kiyosaki',
        url: 'https://books.com/how-to-become.pdf',
        likes: 1,
    },
    {
        title: 'Crime and punishment',
        author: 'Fyodor Dostoevsky',
        url: 'https://books.com/crime-and-punisment.pdf',
        likes: 55,
    }
]

const initialUsers = [
    {
        "username": "andrewha",
        "name": "Andrey",
        "blogs": [],
        "passwordHash": "$2b$10$8/SBD1NdmGG44aZme7ZS1uKxXY/gEBPfuOn67cs4f4Hfm8Seu5NvG"
    },
    {
        "username": "admiral",
        "name": "Sergey",
        "blogs": [],
        "passwordHash": "$2b$10$EXwAvQcS750jzEQZl5fW5.ac68e8v5TOZtYcVedhftxdxM3KKOmM."
    },
    {
        "username": "kitten",
        "name": "example",
        "blogs": [],
        "passwordHash": "$2b$10$7VdWeic5nsXVy.0.KswMh.YhmXGipPXtBuFgCq3bfLKMxzupBx40u"
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, initialUsers, usersInDb
}