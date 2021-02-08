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

module.exports = {
    totalLikes,
    favoriteBlog,
}
