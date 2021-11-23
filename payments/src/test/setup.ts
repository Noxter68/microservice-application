import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
  var signin: (id?: string) => string[];
}

jest.mock("../nats-wrapper");

process.env.STRIPE_KEY =
  "sk_test_51JwlNlFg2Aai0qn43t5n2rQQjexjX5FsBwbumtHRPaQcbj8nfJxPc6AwIBgh5JrnYtNPIrkXuudaNWf0OUp0BlSK00tX45p7nX";

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "testtest";

  mongo = await MongoMemoryServer.create();
  let mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // Build a JWT payload. { id, email }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "davidplanchon.68@gmail.com",
  };
  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // Build the session object { jwt: MY_JWT }
  const session = { jwt: token };
  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);
  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // Return a string that's the cookie with encoded data
  return [`express:sess=${base64}`];
};
