import React from "react";
import { FaShoppingCart } from "react-icons/fa"; // Replace with the appropriate icon component
import { BsXCircle } from "react-icons/bs"; // Import the X icon
import PageWrapper from "../utils/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../Context/CartProvider";
import { useAddToCart, usePlaceOrder } from "../hooks/apiQueries";
import { toast } from "react-toastify";
const CartPage = () => {
  const { cart, handleCartChange } = useCart();
  const { handlePlaceOrder, isPlacingOrder } = usePlaceOrder();
  let subTotal = 0;
  let tax = 0;
  const total = cart.reduce((acc, item) => {
    subTotal += item.price + 0.8 * item.price;
    tax = subTotal * 0.05;
    return acc + item.price;
  }, 0);
  const handleOrder = async () => {
    handleCartChange(null, "clear");
    const data = await handlePlaceOrder();
    // console.log(data);
  };
  return (
    <PageWrapper classes={"min-h-[90dvh]"}>
      <div className="container mx-auto lg:mt-6 px-4 mt-2">
        <h1 className="mb-4 font-martel font-black lg:text-2xl text-secondary text-2xl">
          Your Cart - {cart.length} item(s)
        </h1>
        <div className="flex min-w-full lg:flex-row flex-col-reverse gap-4">
          {/* Cart Items */}
          <div className="lg:basis-2/3">
            <div className="bg-base-100 rounded-lg shadow-md p-4">
              {/* Cart Item List */}

              <div className="grid grid-cols-1 gap-4 lg:max-h-[70vh] max-h-[50vh] overflow-x-hidden ">
                <AnimatePresence mode="">
                  {cart.length === 0 ? (
                    <div className="text-center mt-8">
                      <FaShoppingCart className="text-5xl text-gray-400 mx-auto mb-4" />
                      <p className="text-lg text-gray-600">
                        Your cart is currently empty.
                      </p>
                    </div>
                  ) : (
                    cart?.map((book, index) => (
                      <CartItem
                        layout
                        book={book}
                        key={book._id}
                        i={index}
                        handleCartChange={handleCartChange}
                      />
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div>
            {/* Apply Promo Code */}
            <div className="mb-4 bg-white rounded-lg shadow-md p-4 hidden lg:block">
              <label
                htmlFor="promoCode"
                className="block text-md font-medium text-gray-700 "
              >
                Apply Promo Code
              </label>
              <div className="mt-1 relative input-group shadow-sm ">
                <input
                  type="text"
                  id="promoCode"
                  className="input input-bordered w-full bg-white uppercase "
                />
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    toast.error("Promo Code does not exist!");
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>

              {/* Bill Details */}
              <div className="mb-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{Math.round(subTotal - tax)}</span>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span>-₹{Math.round(subTotal - total)}</span>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between">
                  <span>Tax (GST):</span>
                  <span>₹{Math.round(tax)}</span>
                </div>
              </div>
              <div className=" lg:hidden">
                <div className=" input-group flex items-center">
                  <input
                    type="text"
                    placeholder="Enter Promo Code"
                    className="input input-bordered input-sm w-full bg-white "
                  />
                  <button
                    className="btn btn-ghost "
                    onClick={() => toast.error("Promo code does not exist!")}
                  >
                    Apply
                  </button>
                </div>
              </div>
              {/* Total Amount */}
              <div className="flex justify-between border-t pt-2 font-semibold">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>

              {/* Checkout Button */}
              <button
                className="btn btn-primary text-white w-full mt-4"
                onClick={handleOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

const CartItem = ({ book, handleCartChange, i }) => {
  const addToCart = useAddToCart();

  return (
    <motion.div
      initial={{ y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ type: "", duration: 0.3, delay: 0.1 * i }}
      className="bg-base-100 rounded-lg shadow-lg p-4 mb-4 flex items-center gap-4"
      key={book?._id}
    >
      {/* 1st Column: Book Image */}
      <div className=" mr-4 ">
        <img
          src={book?.imageURL || "https://picsum.photos/200/300"} // Replace with actual image URL
          alt={`${book?.title} Cover`}
          className="w-24 max-w-[100px] object-cover rounded-md"
        />
        {/* <div>
          <p className="text-lg font-black font-martel text-secondary ">₹{book?.price}</p>
        </div> */}
      </div>

      {/* 2nd Column: Book Details */}
      <div className="min-w-[50%]">
        <h2 className="text-lg font-semibold truncate">{book?.title}</h2>
        <p className="text-gray-500">Author: {book?.author}</p>
        <div className="w-full leading-[-100]">
          <span className="line-through text-xs">
            ₹{Math.round(book.price + 0.8 * book.price)}
          </span>
          <h3 className="text-xl font-black font-martel text-secondary">
            ₹{Math.round(book.price)}
          </h3>
        </div>
      </div>

      {/* Remove Button (X icon) */}
      <button
        className="btn  btn-ghost ml-auto btn-square"
        onClick={() => {
          handleCartChange(book, "pull");
          addToCart.mutate({ book_id: book?._id, action: "pull" });
        }}
      >
        <BsXCircle size={23} className="text-secondary" />
      </button>
    </motion.div>
  );
};

export default CartPage;
