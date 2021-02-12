const mongoose = require("mongoose")
const supertest = require("supertest")
const User = require("../models/user")
const testHelper = require("./test_helper")
const app = require("../app")
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const userObjects = testHelper.initialUsers.map((user) => new User(user))
    const promiseArray = userObjects.map((user) => user.save())
    await Promise.all(promiseArray)
})

describe("getting users", () => {
    test("the correct number of users is returned", async () => {
        const response = await api
            .get("/api/users")
            .expect(200)
            .expect("Content-Type", /application\/json/)

        expect(response.body.length).toBe(testHelper.initialUsers.length)
    })

    test("each response user has exactly 3 fields: username,name,id", async () => {
        const response = await api.get("/api/users")
        const users = response.body

        users.forEach((u) => {
            expect(Object.keys(u).length).toBe(3)
            expect(u.username).toBeDefined()
            expect(u.name).toBeDefined()
            expect(u.id).toBeDefined()
        })
    })
})

describe("adding user", () => {
    describe("with good fields", () => {
        let response

        beforeEach(async () => {
            await api.post("/api/users").send(testHelper.userToAdd)
            response = await api.get("/api/users")
        })

        test("db has 1 more user after addition", async () => {
            expect(response.body.length).toBe(
                testHelper.initialUsers.length + 1
            )
        })

        test("added user has his fields defined", async () => {
            const user = response.body.find(
                (u) => u.username === testHelper.userToAdd.username
            )
            expect(user).toBeDefined()
            expect(user.username).toBeDefined()
            expect(user.name).toBeDefined()
            expect(user.id).toBeDefined()
        })
    })

    describe("with bad fields", () => {
        let newUser //careful doing this with parallel tests

        afterEach(async () => {
            const response = await api
                .post("/api/users")
                .send(newUser)
                .expect(400)

            expect(response.body.error).toBeDefined()

            const users = await api.get("/api/users")
            expect(users.body.length).toBe(testHelper.initialUsers.length)
        })

        test("username already exists", async () => {
            const username = testHelper.initialUsers[0].username
            newUser = {
                ...testHelper.userToAdd,
                username,
            }
        })

        test("username is less than 3 characters long", async () => {
            const username = "ab"
            newUser = {
                ...testHelper.userToAdd,
                username,
            }
        })

        test("password is less than 3 characters long", async () => {
            const password = "ab"
            newUser = {
                ...testHelper.userToAdd,
                password,
            }
        })
    })
})

afterAll(() => mongoose.connection.close())
