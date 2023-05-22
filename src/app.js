import React, { useState, useEffect } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

function App({ list }) {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [count, setCount] = useState(0);

  const handleDelete = (code) => {
    const updatedCart = cart.filter((item) => item.code !== code);
    setCart(updatedCart);
  };

  const handleAddToCart = (itemCode) => {
    const selectedItem = list.find((item) => item.code === itemCode);
    if (!selectedItem) {
      return;
    }

    const existingItem = cart.find((item) => item.code === selectedItem.code);
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.code === selectedItem.code
          ? { ...item, count: item.count + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      const newItem = { ...selectedItem, count: 1 };
      setCart((prevCart) => [...prevCart, newItem]);
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const uniqueItems = new Set(cart.map((item) => item.code));
    const uniqueItemCount = uniqueItems.size;
    setCount(uniqueItemCount);

    const total = cart.reduce((acc, item) => {
      if (item.count > 1 && item.price !== 0) {
        return acc + item.price * item.count;
      } else {
        return acc + item.price;
      }
    }, 0);
    setTotalPrice(total);
  }, [cart]);

  return (
    <PageLayout>
      <Head title="Магазин" showButton={false} toggleModal={toggleModal} />
      <Controls
        cart={cart}
        handleDelete={handleDelete}
        toggleModal={toggleModal}
        count={count}
        totalPrice={totalPrice}
      />
      <List list={list} onAddToCart={handleAddToCart} />
      {isModalOpen && (
        <Modal
          toggleModal={toggleModal}
          cart={cart}
          handleDelete={handleDelete}
          totalPrice={totalPrice}
        />
      )}
    </PageLayout>
  );
}

export default App;
