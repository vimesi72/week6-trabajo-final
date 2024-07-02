const request = require("supertest");
const app = require("../app");

let categoryId, TOKEN;

const BASE_URL = "/api/v1/categories";
const BASE_URL_AUTH = "/api/v1/users/login"; //para ruta login en users

beforeAll(async () => {
  //Inicio- Login
  const user = {
    email: "gael@gmail.com",
    password: "300572",
  };

  const res = await request(app).post(`${BASE_URL_AUTH}`).send(user);

  TOKEN = res.body.token;
});

test("POST -> 'BASE_URL' should return status code(201) and res.body.name === category.name", async () => {
  const category = {
    name: "Computer",
  };

  const res = await request(app)
    .post(BASE_URL)
    .send(category)
    .set("Authorization", `Bearer ${TOKEN}`);

  categoryId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(category.name);
});

test("GET -> 'BASE_URL' should return status code(200) and res.body.length === 1", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("DELETE -> 'BASE_URL/:id' should return status code(204)", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${categoryId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.statusCode).toBe(204);
});
