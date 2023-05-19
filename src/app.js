import React, { useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

function App({ list }) {
  const [cart, setCart] = useState([]);

  const handleDelete = (code) => {
    const updatedCart = cart.map((item) => {
      if (item.code === code) {
        return {
          ...item,
          count: item.count > 1 ? item.count - 1 : 0,
        };
      }
      return item;
    });

    const filteredCart = updatedCart.filter((item) => item.count > 0);
    setCart(filteredCart);
  };

  const handleAddToCart = (itemCode) => {
    const selectedItem = list.find((item) => item.code === itemCode);
    if (selectedItem) {
      const existingItem = cart.find((item) => item.code === selectedItem.code);
      if (existingItem) {
        const updatedCart = cart.map((item) => {
          if (item.code === selectedItem.code) {
            return {
              ...item,
              count: item.count + 1,
            };
          }
          return item;
        });
        setCart(updatedCart);
      } else {
        selectedItem.count = 1;
        setCart([...cart, selectedItem]);
      }
    }
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls cart={cart} handleDelete={handleDelete} />
      <List list={list} onAddToCart={handleAddToCart} />
    </PageLayout>
  );
}

export default App;
