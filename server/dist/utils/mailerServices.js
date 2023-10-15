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
exports.sendMail = void 0;
const courier_1 = require("@trycourier/courier");
const courier = (0, courier_1.CourierClient)({
    authorizationToken: process.env.COURIER_TOKEN,
}); // get from the Courier UI
const sendMail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let books = [];
    let totalamt = 0;
    user.cart.forEach((book) => {
        books.push(book);
        totalamt += book.price;
    });
    const { requestId } = yield courier.send({
        message: {
            content: {
                title: "Order Confirmation",
                body: `
        Dear {{userName}},

        Thank you for placing an order on Bibliophile! Your order details are as follows:

        Order ID: {{orderID}}
        
        {{#each books}}
        - Book Title: {{this.title}}
        - Author: {{this.author}}
        - Condition: {{this.rating}} / 5
        - Owners Email: {{this.owner_id}}

        {{/each}}

        Total Amount: {{ totalamt }}

        We will process your order shortly. If you have any questions or need further assistance, please don't hesitate to contact our support team.

        Best regards,
        The Bibliophile Team
      `,
            },
            data: {
                totalamt,
                userName: user.name,
                orderID: "123456",
                books,
            },
            to: {
                email: user.email,
            },
        },
    });
});
exports.sendMail = sendMail;
