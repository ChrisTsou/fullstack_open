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
    let response

    beforeEach(async () => {
        const newUser = testHelper.userToAdd
        await api.post("/api/users").send(newUser)
        response = await api.get("/api/users")
    })

    test("db has 1 more user after addition", async () => {
        expect(response.body.length).toBe(testHelper.initialUsers.length + 1)
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

afterAll(() => mongoose.connection.close())
