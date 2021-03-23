const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user")

    response.json(blogs)
})

const checkToken = (token, response) => {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" })
    }
    return decodedToken
}

blogRouter.post("/", async (request, response) => {
    const body = request.body

    const decodedToken = checkToken(request.token, response)
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogRouter.delete("/:id", async (request, response) => {
    const decodedToken = checkToken(request.token, response)
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== decodedToken.id.toString()) {
        return response
            .status(401)
            .json({ error: "not the creator of the blog" })
    }

    await blog.remove()

    response.sendStatus(204)
})

blogRouter.put("/:id", async (request, response) => {
    const body = request.body

    const blog = {
        ...body,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
        runValidators: true,
    }).populate("user")

    response.json(updatedBlog)
})

module.exports = blogRouter
