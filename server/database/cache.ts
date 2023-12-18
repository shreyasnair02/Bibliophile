import dotenv from "dotenv";
dotenv.config();
import { createClient } from "redis";
const password = process.env.REDIS_PASSWORD;
const host = process.env.REDIS_HOST;
const port = parseInt(process.env.REDIS_PORT || "10938");
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
