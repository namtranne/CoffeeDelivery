import { createContext, useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
export const CartContext = createContext({
  cartList: [],
  addToCart: (product) => {},
  removeFromCart: (id) => {},
  removeAll: () => {},
});

export const CartContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  function addToCart(product) {
    setCartList([...cartList, product]);
  }

  function removeFromCart(id) {
    const newCart = cartList.filter((c) => c.id !== id);
    setCartList([...newCart]);
  }

  function removeAll() {
    setCartList([]);
  }

  const value = {
    cartList: cartList,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    removeAll: removeAll,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// export default AuthContextProvider;
