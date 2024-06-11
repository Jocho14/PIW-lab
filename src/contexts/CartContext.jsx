import React, { createContext, useReducer, useEffect } from "react";
import { cartReducer } from "../reducers/cartReducer";

const CartContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
