require("../models");
const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");

let TOKEN, product, purchase, userId;

const BASE_URL = "/api/v1/purchase";
const BASE_URL_AUTH = "/api/v1/users/login";

beforeAll(async () => {
  //Inicio- Login
  const user = {
    email: "gael@gmail.com",
    password: "300572",
  };

  const res = await request(app).post(`${BASE_URL_AUTH}`).send(user);

  TOKEN = res.body.token;
  userId = res.body.user.id;

  product = await Product.create({
    title: "product 1",
    description: "loremloremlorem",
    price: 100,
  });

  purchase = {
    quantity: 3,
    productId: product.id,
    userId: res.body.id,
  };
});

afterAll(async () => {
  await product.destroy();
});

test("POST -> 'BASE_URL' should return status code 201, res.body.purchase.userid === purchase.userid", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(purchase);

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.userId).toBe(purchase.userId);
});

test("GET -> 'BASE_URL' should return status code 200 and res.boby.purchase.userid === purchase.userid", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body.userId).toBe(purchase.userId);
});
