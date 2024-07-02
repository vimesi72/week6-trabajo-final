require("../models");
const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");

let TOKEN, product, cart, purchase, userId;

const BASE_URL = "/api/v1/purchase";
const BASE_LOGIN = "/api/v1/users/login";

beforeAll(async () => {
  //Inicio- Login
  const user = {
    email: "gael@gmail.com",
    password: "300572",
  };

  const res = await request(app).post(`${BASE_LOGIN}`).send(user);

  TOKEN = res.body.token;
  userId = res.body.user.id;

  product = await Product.create({
    title: "Laptod Dell",
    description: "Laptod Dell Gamer X10",
    price: 2500.33,
  });

  purchase = {
    quantity: 3,
    productId: product.id,
    userId: res.body.id,
  };

  cart = {
    quantity: 1,
    productId: product.id,
  };

  //para correr test y crea compra y elimina carro
  await request(app)
    .post("/api/v1/cart")
    .send(cart)
    .set("Authorization", `Bearer ${TOKEN}`);
});

afterAll(async () => {
  await product.destroy();
});

test("POST -> 'BASE_URL' should return status code 201, res.body.quantity === cart.quantity", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(purchase);

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.userId).toBe(purchase.userId);
  //expect(res.body[0].quantity).toBe(cart.quantity);
});

test("GET -> 'BASE_URL' should return 200 and res.body..purchase.userid === purchase.userId", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  //expect(res.body).toHaveLength(1);
  expect(res.body.userId).toBe(purchase.userId);
});
