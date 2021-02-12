const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user")

    response.json(blogs)
})

blogRouter.post("/", async (request, response) => {
    const body = request.body

    const user = await User.findOne()
    const userId = user._id

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: userId,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).send(savedBlog)
})

blogRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)

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
    })

    response.json(updatedBlog)
})

module.exports = blogRouter
