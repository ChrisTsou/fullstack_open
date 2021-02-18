const mongoose = require("mongoose")
const supertest = require("supertest")
const Blog = require("../models/blog")
const User = require("../models/user")
const testHelper = require("./test_helper")
const app = require("../app")
const api = supertest(app)

let token
let userId

beforeAll(async () => {
    await User.deleteMany({})

    const userObjects = testHelper.initialUsers.map((u) => new User(u))
    const promiseArray = userObjects.map((u) => u.save())

    await Promise.all(promiseArray)

    const postResponse = await api
        .post("/api/users")
        .send(testHelper.userToAdd)
        .expect(200)

    const loginResponse = await api
        .post("/api/login")
        .send({
            username: testHelper.userToAdd.username,
            password: testHelper.userToAdd.password,
        })
        .expect(200)

    token = loginResponse.body.token
    userId = postResponse.body.id
})

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
    test("with invalid token returns 401", async () => {
        await api
            .post("/api/blogs")
            .send(testHelper.blogToAdd)
            .set("authorization", "bearer invalidToken")
            .expect(401)
    })

    describe("with valid token", () => {
        test("blogs are one more after add. added blog has its fields", async () => {
            const newBlog = testHelper.blogToAdd
            const postResponse = await api
                .post("/api/blogs")
                .set("authorization", `bearer ${token}`)
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/)

            const getResponse = await api.get("/api/blogs")

            expect(getResponse.body.length).toBe(
                testHelper.initialBlogs.length + 1
            )

            expect(postResponse.body.author).toBe(testHelper.blogToAdd.author)
            expect(postResponse.body.url).toBe(testHelper.blogToAdd.url)
            expect(postResponse.body.likes).toBe(testHelper.blogToAdd.likes)
            expect(postResponse.body.user).toBe(userId)
        })

        test("added blog likes is 0 if not provided", async () => {
            const { likes, ...newBlog } = testHelper.blogToAdd

            const postResponse = await api
                .post("/api/blogs")
                .set("authorization", `bearer ${token}`)
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/)

            expect(postResponse.body.likes).toBe(0)
        })

        test("blogs without title or url are not added", async () => {
            const { title, ...noTitleBlog } = testHelper.blogToAdd
            const { url, ...noUrlBlog } = testHelper.blogToAdd

            await api
                .post("/api/blogs")
                .set("authorization", `bearer ${token}`)
                .send(noTitleBlog)
                .expect(400)
            await api
                .post("/api/blogs")
                .set("authorization", `bearer ${token}`)
                .send(noUrlBlog)
                .expect(400)
        })
    })
})

describe("deleting a blog", () => {
    let blogIdToDelete

    beforeEach(async () => {
        const postResponse = await api
            .post("/api/blogs")
            .send(testHelper.blogToAdd)
            .set("authorization", `bearer ${token}`)
            .expect(201)

        blogIdToDelete = postResponse.body.id
    })

    test("invalid token responds with 401 unauthorized", async () => {
        await api
            .delete(`/api/blogs/${blogIdToDelete}`)
            .set("authorization", "invalidToken")
            .expect(401)
    })

    test("wrong user responds with 401 and error message", async () => {
        const wrongUser = {
            username: "wrongUser",
            name: "user wrong",
            password: "wrongUserPassword",
        }

        const userPostResponse = await api
            .post("/api/users")
            .send(wrongUser)
            .expect(200)

        const loginResponse = await api
            .post("/api/login")
            .send({
                username: wrongUser.username,
                password: wrongUser.password,
            })
            .expect(200)

        const wrongUserToken = loginResponse.body.token

        const deleteResponse = await api
            .delete(`/api/blogs/${blogIdToDelete}`)
            .set("authorization", `bearer ${wrongUserToken}`)
            .expect(401)

        expect(deleteResponse.body.error).toBe("not the creator of the blog")

        await User.findByIdAndDelete(userPostResponse.body.id)
    })

    test("blog is properly deleted from database", async () => {
        await api
            .delete(`/api/blogs/${blogIdToDelete}`)
            .set("authorization", `bearer ${token}`)
            .expect(204)
        const response = await api.get("/api/blogs")

        expect(response.body.length).toBe(testHelper.initialBlogs.length)
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
