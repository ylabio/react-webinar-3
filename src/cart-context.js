import React from "react";
import PropTypes from 'prop-types';

const CartContext = React.createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = React.useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (elem) => elem.code === item.code
      );
      if (existingItemIndex >= 0) {
        return prevCart.map((elem, index) => 
          index === existingItemIndex
            ? { ...elem, quantity: elem.quantity + 1 }
            : elem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const value = {
    cart,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  return React.useContext(CartContext);
}

CartProvider.propTypes = {
  children: PropTypes.node,
};