const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.reduce((acc, item) => {
        return acc + item.likes
    }, 0)
    return likes
}

const favoriteBlog = (blogs) => {
    let max = 0
    let result
    for (let item in blogs) {
        if (blogs[item].likes > max) {
            max = blogs[item].likes
            result = blogs[item]
        }
    }
    return result
}

const mostBlogs = (blogs) => {
    const counts = {}

    for (let item of blogs) {
        if (counts[item.author]) {
            counts[item.author] += 1
        } else {
            counts[item.author] = 1
        }
    }

    let maxBlogs = 0
    let topAuthor = ''

    for (let author in counts) {
        if (counts[author] > maxBlogs) {
            maxBlogs = counts[author]
            topAuthor = author
        }
    }

    return {
        author: topAuthor,
        blogs: maxBlogs
    }
}

const mostLikes = (blogs) => {
    const counts = {}
    for (let item of blogs) {
        if (counts[item.author]) {
            counts[item.author] += item.likes
        } else {
            counts[item.author] = item.likes
        }
    }

    let maxLikes = 0
    let topAuthor = ''

    for (let author in counts) {
        if (counts[author] > maxLikes) {
            maxLikes = counts[author]
            topAuthor = author
        }
    }

    return {
        author: topAuthor,
        likes: maxLikes
    }
}


module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}