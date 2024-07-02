require("../models");
const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");

let TOKEN, cart, product, cartId;

const BASE_URL = "/api/v1/cart";
const BASE_URL_AUTH = "/api/v1/users/login";

beforeAll(async () => {
  //Inicio- Login
  const user = {
    email: "gael@gmail.com",
    password: "300572",
  };

  const res = await request(app).post(`${BASE_URL_AUTH}`).send(user);

  TOKEN = res.body.token;

  product = await Product.create({
    title: "product 1",
    description: "loremloremlorem",
    price: "100",
  });

  cart = {
    quantity: 3,
    productId: product.id,
  };
});

afterAll(async () => {
  await product.destroy();
});

test("POST -> 'BASE_URL' should return status code 201, res.body.quantity === cart.quantity", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(cart);

  cartId = res.body.id;

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.quantity).toBe(cart.quantity);
  //expect(res.body.userId).toBe(userId);
});

test("GET -> 'BASE_URL' should return status code 200 and res.boby.length === 1", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});
