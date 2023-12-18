"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToRedis = exports.redisClient = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redis_1 = require("redis");
const password = process.env.REDIS_PASSWORD;
const host = process.env.REDIS_HOST;
const port = parseInt(process.env.REDIS_PORT || "10938");
exports.redisClient = (0, redis_1.createClient)({
    password,
    socket: {
        host,
        port,
    },
});
const connectToRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.redisClient.connect();
});
exports.connectToRedis = connectToRedis;
