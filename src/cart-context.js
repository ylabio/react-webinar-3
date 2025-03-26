import React from "react";
import PropTypes from 'prop-types';

const CartContext = React.createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = React.useState([]);

  // TODO: for now fun only adds
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const value = {
    cart,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  return useContext(CartContext);
}

CartProvider.propTypes = {
  children: PropTypes.node,
};