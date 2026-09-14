const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

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
})

describe('favorite blog', () => {
    test('most liked blog', () => {
        const listOfBlogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54354d17f8',
                title: 'Harmful',
                author: 'Thomas Edison',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Edison.pdf',
                likes: 9,
                __v: 0
            }
        ]

        const result = listHelper.favoriteBlog(listOfBlogs)

        assert.deepStrictEqual(result, listOfBlogs[1])
    })
})

describe('most blogs', () => {
    test('most productive author', () => {
        const listOfBlogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d2341',
                title: 'Freedom',
                author: 'Thomas Edison',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/EdisonFreedom.pdf',
                likes: 9,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d4321',
                title: 'Harmful',
                author: 'Thomas Edison',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/EdisonHarmf.pdf',
                likes: 15,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d1234',
                title: 'Beauty Animals',
                author: 'Thomas Edison',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/EdisonAnimals.pdf',
                likes: 11,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d3321',
                title: 'Sweden',
                author: 'Zlathan Ibrahimovic',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Zlatan.pdf',
                likes: 3,
                __v: 0
            }
        ]

        const result = { author: 'Thomas Edison', blogs: 3 }
        const e = listHelper.mostBlogs(listOfBlogs)
        assert.deepStrictEqual(result, e)
    })
})


describe('most likes', () => {
    test('most liked author', () => {
        const listOfBlogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d2341',
                title: 'Freedom',
                author: 'Thomas Edison',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/EdisonFreedom.pdf',
                likes: 9,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d4321',
                title: 'Harmful',
                author: 'Thomas Edison',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/EdisonHarmf.pdf',
                likes: 15,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d1234',
                title: 'Beauty Animals',
                author: 'Thomas Edison',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/EdisonAnimals.pdf',
                likes: 11,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d3321',
                title: 'Sweden',
                author: 'Zlathan Ibrahimovic',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Zlatan.pdf',
                likes: 3,
                __v: 0
            }
        ]

        const result = { author: 'Thomas Edison', likes: 35 }
        const e = listHelper.mostLikes(listOfBlogs)
        assert.deepStrictEqual(result, e)
    })
})