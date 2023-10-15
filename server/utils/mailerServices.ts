import { CourierClient } from "@trycourier/courier";
import { IBook, IUser } from "../types/types";
const courier = CourierClient({
  authorizationToken: process.env.COURIER_TOKEN,
}); // get from the Courier UI
export const sendMail = async (user: IUser) => {
  let books: IBook[] = [];
  let totalamt = 0;
  user.cart.forEach((book) => {
    books.push(book);
    totalamt += book.price;
  });

  const { requestId } = await courier.send({
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
};
