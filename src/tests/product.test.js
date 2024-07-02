require("../models");
const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");

let product, TOKEN, category, productId;

const BASE_URL = "/api/v1/products";
const BASE_URL_AUTH = "/api/v1/users/login";

beforeAll(async () => {
  //Inicio- Login
  const user = {
    email: "gael@gmail.com",
    password: "300572",
  };

  const res = await request(app).post(`${BASE_URL_AUTH}`).send(user);

  TOKEN = res.body.token;

  category = await Category.create({
    name: "Electronic",
  });

  product = {
    title: "Lg oled 55",
    description: "lroem10",
    price: 1200.2,
    categoryId: category.id,
  };
});

afterAll(async () => {
  await category.destroy();
});

test("POST -> 'BASE_URL' should return stadus code 201, and res.body.title === products.title", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set("Authorization", `Bearer ${TOKEN}`);

  productId = res.body.id;

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.title).toBe(product.title);
  expect(res.body.categoryId).toBe(category.id);
});
