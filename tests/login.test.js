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
    await api.post("/api/users").send(testHelper.userToAdd)
})

test("login with correct password", async () => {
    const response = await api
        .post("/api/login")
        .send({
            username: testHelper.userToAdd.username,
            password: testHelper.userToAdd.password,
        })
        .expect(200)

    expect(response.body.username).toBe(testHelper.userToAdd.username)
    expect(response.body.name).toBe(testHelper.userToAdd.name)
    expect(response.body.token).toBeDefined()
})

test("login with incorrect password", async () => {
    const response = await api
        .post("/api/login")
        .send({
            username: testHelper.userToAdd.username,
            password: "badpassword",
        })
        .expect(401)

    expect(response.body.error).toBe("invalid username or password")
})

afterAll(() => mongoose.connection.close())
