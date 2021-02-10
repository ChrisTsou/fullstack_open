const mongoose = require("mongoose")
const supertest = require("supertest")
const Blog = require("../models/blog")
const testHelper = require("./test_helper")
const app = require("../app")
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = testHelper.initialBlogs.map((blog) => new Blog(blog))
    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)
})

test("right number of blogs are returned", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body.length).toBe(testHelper.initialBlogs.length)
})

test("blogs have id property", async () => {
    const response = await api.get("/api/blogs")

    response.body.forEach((blog) => {
        expect(blog.id).toBeDefined()
    })
})

test("blog is added properly with post", async () => {
    const newBlog = new Blog(testHelper.blogToAdd)
    await newBlog.save()

    const response = await api.get("/api/blogs")

    expect(response.body.length).toBe(testHelper.initialBlogs.length + 1)

    const addedBlog = response.body.find(
        (b) => b.title === testHelper.blogToAdd.title
    )

    expect(addedBlog).toBeDefined()
    expect(addedBlog.author).toBe(testHelper.blogToAdd.author)
    expect(addedBlog.url).toBe(testHelper.blogToAdd.url)
    expect(addedBlog.likes).toBe(testHelper.blogToAdd.likes)
})

test("added blog likes is 0 if not provided", async () => {
    const { likes, ...newBlog } = testHelper.blogToAdd

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")
    const addedBlog = response.body.find(
        (b) => b.title === testHelper.blogToAdd.title
    )

    expect(addedBlog.likes).toBe(0)
})

afterAll(() => mongoose.connection.close())
