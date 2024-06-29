const request = requiere("supertest");
const app = require("../app");

const BASE_URL = "/api/v1/users";
let TOKEN;

beforeAll(async () => {
  const body = {
    email: "gael@gmail.com",
    password: "300572",
  };

  const res = await request(app).post(`${BASE_URL}/login`).send(body);

  //console.log(res.body);
  TOKEN = res.body.token;
});
test("POST -> 'BASE_URL', shoul return statusCode 201, and res.body.firstName === user.firstName", async () => {
  const user = {
    firstName: "Gael",
    lastName: "Medina",
    email: "gael@gmail.com",
    password: "300572",
    phone: "3424",
  };

  const res = await request(app).post(BASE_URL).send(user);

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(user.firstName);
});

test("GET -> 'BASE_URL', should return statusCode 200, and res.body.length === 2", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`);

  console.log(res.body);

  expect(res.status).toBe(200);
});
