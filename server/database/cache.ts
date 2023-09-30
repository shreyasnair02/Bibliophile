import dotenv from "dotenv";
dotenv.config();
import { createClient } from "redis";
const password = process.env.REDIS_PASSWORD;
const host = process.env.REDIS_HOST;
const port = 19401;
export const redisClient = createClient({
  password,
  socket: {
    host,
    port,
  },
});
export const connectToRedis = async () => {
  await redisClient.connect();
};
