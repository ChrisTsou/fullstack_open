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

afterAll(() => mongoose.connection.close())
