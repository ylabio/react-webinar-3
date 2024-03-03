import React from "react";
import "./style.css";
import Cart from "../cart";
import { useState } from "react";

function Controls() {
  const [cartlActive, setCartlActive] = useState(false);
  return (
    <>
      <Cart active={cartlActive} setActive={setCartlActive} />
      <div className="Controls">
        <button onClick={() => setCartlActive(true)}>Перейти</button>
      </div>
    </>
  );
}

export default Controls;
