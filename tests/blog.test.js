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

describe("getting blogs", () => {
    test("right number of blogs are returned", async () => {
        const response = await api.get("/api/blogs")

        expect(response.body.length).toBe(testHelper.initialBlogs.length)
    })

    test("blogs have id fields", async () => {
        const response = await api.get("/api/blogs")

        response.body.forEach((blog) => {
            expect(blog.id).toBeDefined()
        })
    })
})

describe("adding a blog", () => {
    test("blogs are one more after add. added blog has its fields", async () => {
        const newBlog = testHelper.blogToAdd
        await api.post("/api/blogs").send(newBlog).expect(201)

        const response = await api.get("/api/blogs")

        expect(response.body.length).toBe(testHelper.initialBlogs.length + 1)

        const addedBlog = response.body.find(
            (b) => b.title === testHelper.blogToAdd.title
        )

        expect(addedBlog).toBeDefined()
        expect(addedBlog.author).toBe(testHelper.blogToAdd.author)
        expect(addedBlog.url).toBe(testHelper.blogToAdd.url)
        expect(addedBlog.likes).toBe(testHelper.blogToAdd.likes)
        expect(addedBlog.user).toBeDefined()
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

    test("blogs without title or url are not added", async () => {
        const { title, ...noTitleBlog } = testHelper.blogToAdd
        const { url, ...noUrlBlog } = testHelper.blogToAdd

        await api.post("/api/blogs").send(noTitleBlog).expect(400)
        await api.post("/api/blogs").send(noUrlBlog).expect(400)
    })
})

describe("deleting a blog", () => {
    test("blog is properly deleted from database", async () => {
        const blogIdToDelete = testHelper.initialBlogs[0]._id

        await api.delete(`/api/blogs/${blogIdToDelete}`).expect(204)
        const response = await api.get("/api/blogs")

        expect(response.body.length).toBe(testHelper.initialBlogs.length - 1)
        expect(
            response.body.find((b) => b.id === blogIdToDelete)
        ).toBeUndefined()
    })
})

describe("updating a blog", () => {
    test("amount of likes in blog updated", async () => {
        const blog = { ...testHelper.initialBlogs[0], likes: 10 }
        const blogId = blog._id
        delete blog._id
        delete blog.__v

        await api.put(`/api/blogs/${blogId}`).send(blog)

        const response = await api.get("/api/blogs")
        const updatedBlogLikes = response.body.find((b) => b.id === blogId)
            .likes

        expect(updatedBlogLikes).toBe(10)
    })
})

afterAll(() => mongoose.connection.close())
