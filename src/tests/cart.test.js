require("../models");
const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");

let TOKEN, cart, product, cartId, userId;

const BASE_URL = "/api/v1/cart";
const URL_LOGIN = "/api/v1/users/login";

beforeAll(async () => {
  //Inicio- Login
  const user = {
    email: "gael@gmail.com",
    password: "300572",
  };

  const res = await request(app).post(`${URL_LOGIN}`).send(user);

  TOKEN = res.body.token;
  userId = res.body.user.id;

  product = await Product.create({
    title: "Laptop Dell",
    description: "Dell Gamer",
    price: 2000,
  });

  cart = {
    quantity: 3,
    productId: product.id,
  };
});

//afterAll(async () => {
//  await product.destroy();
//});

test("POST -> 'BASE_URL' should return status code 201, res.body.quantity === cart.quantity", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(cart);

  cartId = res.body.id;

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.quantity).toBe(cart.quantity);
  expect(res.body.userId).toBe(userId);
});

test("GET -> 'BASE_URL' should return status code 200 and res.boby.length === 1", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].userId).toBeDefined();
  expect(res.body[0].userId).toBe(userId);
  expect(res.body[0].product).toBeDefined();
  expect(res.body[0].productId).toBe(product.id);
  expect(res.body[0].product.id).toBe(product.id);
});

test("GET -> 'BASE_URL/:id',should return status code 200 and res.body.quantity === cart.quantity", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${cartId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.quantity).toBe(cart.quantity);

  expect(res.body.userId).toBeDefined();
  expect(res.body.userId).toBe(userId);

  expect(res.body.product).toBeDefined();
  expect(res.body.productId).toBe(product.id);
  expect(res.body.product.id).toBe(product.id);
});

test("PUT -> 'BASE_URL/:id',should return status code 200 and res.body.quantity === bodyUpdate.quantity", async () => {
  const cartUpdate = {
    quantity: 2,
  };

  const res = await request(app)
    .put(`${BASE_URL}/${cartId}`)
    .send(cartUpdate)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.quantity).toBe(cartUpdate.quantity);
});

test("DELETE -> 'BASE_URL/:id',should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${cartId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(204);
  await product.destroy();
});
