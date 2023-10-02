import React from "react";
import { useContext } from "react";
import { useLogin } from "./LoginProvider";
import { useEffect } from "react";
import { useState } from "react";

const Context = React.createContext({});

export const useCart = () => {
  return useContext(Context);
};
export function CartProvider({ children }) {
  const { isLoggedIn, user, setLoginData } = useLogin();
  const [cart, setCart] = useState([]);
  const handleCartChange = (book, action = "push") => {
    let flag = true;
    switch (action) {
      case "push":
        setCart((prev) => {
          const isBookInCart = prev.find((item) => item._id === book._id);
          if (!isBookInCart) return [...prev, book];
          flag = false;
          return prev;
        });
        break;
      case "pull":
        setCart((prev) => {
          const newCart = prev.filter((item) => item._id !== book._id);
          return newCart;
        });
        break;
    }
    return flag;
  };
  useEffect(() => {
    if (isLoggedIn) {
      setCart(user.cart);
    }
  }, [user, isLoggedIn]);
  return (
    <Context.Provider value={{ cart, handleCartChange }}>
      {children}
    </Context.Provider>
  );
}

export default CartProvider;
