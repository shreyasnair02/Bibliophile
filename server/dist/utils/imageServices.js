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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.renderBookImage = exports.changeImageURL = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const cache_1 = require("../database/cache");
// Rest of your code here
function uploadImage(base64String, key) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageBuffer = Buffer.from(base64String.split(",")[1], "base64");
        const command = new client_s3_1.PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: "public/" + key,
            Body: imageBuffer,
            ContentType: "image/png",
        });
        try {
            const url = yield s3Client.send(command);
        }
        catch (err) {
            console.log(err.message);
        }
    });
}
const changeImageURL = (book) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = book._id + ".png";
        const imageURL = yield uploadImage(book.imageURL, key);
        return key;
    }
    catch (err) {
        console.log(err.message);
        return "";
    }
});
exports.changeImageURL = changeImageURL;
const s3Client = new client_s3_1.S3Client({
    region: process.env.S3_REGION || "ap-south-1",
    credentials: {
        accessKeyId: process.env.S3_ACCESSKEYID || "",
        secretAccessKey: process.env.S3_SECRETACCESSKEY || "",
    },
});
function getObjectURL(key) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: process.env.S3_BUCKET || "",
            Key: key,
        });
        const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, { expiresIn: 3600 });
        return url;
    });
}
const checkImageCache = (imageURL) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appendtoURL = "public/";
        const cachedPresignedUrl = yield cache_1.redisClient.get(appendtoURL + imageURL);
        if (cachedPresignedUrl) {
            return cachedPresignedUrl;
        }
        else {
            const presignedUrl = yield getObjectURL(appendtoURL + imageURL);
            yield cache_1.redisClient.setEx(appendtoURL + imageURL, 3600, presignedUrl);
            return presignedUrl;
        }
    }
    catch (err) {
        return "";
    }
});
const renderBookImage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const updateBooks = yield Promise.all(data.map((book) => __awaiter(void 0, void 0, void 0, function* () {
        const imageURL = yield checkImageCache(book.imageURL);
        book.imageURL = imageURL;
        return book;
    })));
    return updateBooks;
});
exports.renderBookImage = renderBookImage;
const deleteImage = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_s3_1.DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET || "",
        Key: key,
    });
    try {
        const data = yield s3Client.send(command);
        return data;
    }
    catch (err) {
        console.log(err.message);
    }
});
exports.deleteImage = deleteImage;
