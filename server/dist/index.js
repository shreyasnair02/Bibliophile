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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const books_1 = __importDefault(require("./routes/books"));
const users_1 = __importDefault(require("./routes/users"));
const db_1 = __importDefault(require("./database/db"));
const cors_1 = __importDefault(require("cors"));
const bookSchema_1 = require("./Models/bookSchema");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cache_1 = require("./database/cache");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express_1.default.json({ limit: "10mb" }));
app.use("/api/v1/books", books_1.default);
app.use("/api/v1/users", users_1.default);
app.get("/updateall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield bookSchema_1.bookModel.updateMany({}, { $set: { owner_id: "admin@gmail.com" } }, { runValidators: true, new: true });
        console.log(res);
    }
    catch (err) {
        console.log(err.message);
    }
}));
const establishConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        yield (0, cache_1.connectToRedis)();
        startListening();
    }
    catch (err) {
        console.log(err);
    }
});
establishConnection();
function startListening() {
    return app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
}
