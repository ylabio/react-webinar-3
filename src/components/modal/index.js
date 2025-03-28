import React from "react";
import { useCart } from "../../cart-context";
import { IconCross } from "../icon";
import List from "../list";
import './style.css';

export function Modal({ title }) {
  const { cart, isOpened, toggleCartModal } = useCart();
  const [isClosing, setIsClosing] = React.useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      toggleCartModal();
      setIsClosing(false);
    }, 300);
  };
  
  if (!isOpened) return null

  return (
    <div className={`Modal ${isClosing ? 'closing' : ''}`}>
      <div className={`Modal-container ${isClosing ? 'closing' : ''}`}>
        <div className="Modal-header">
          <h1>{title}</h1>
          <div className="Modal-cross" onClick={handleClose}>
            <IconCross />
          </div>
        </div>
        <List list={cart} isCart={true}/>
      </div>
    </div>
  );
}