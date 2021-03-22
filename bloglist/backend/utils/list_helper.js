const _ = require("lodash")

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0)

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return "no blogs"
    }

    const fav = blogs.sort((b1, b2) => b2.likes - b1.likes)[0]

    return {
        title: fav.title,
        author: fav.author,
        likes: fav.likes,
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return "no blogs"
    }

    const result = _(blogs).countBy("author").entries().maxBy(_.last)

    return {
        author: result[0],
        blogs: result[1],
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return "no blogs"
    }

    const groupTransform = (blogs, author) => {
        return {
            author: author,
            likes: blogs.reduce((acc, blog) => acc + blog.likes, 0),
        }
    }

    return _(blogs).groupBy("author").map(groupTransform).maxBy("likes")
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
