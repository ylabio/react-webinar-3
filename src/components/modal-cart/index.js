import React, {useState} from "react";
import './style.css';
import {Modal} from "../modal";
import {formattedPrice, plural} from "../../utils";

function ModalCart({list, onDeleteItem, totalCount, totalPrice}) {
  const [isOpen, setIsOpen] = useState(false);
  const count = list.length;
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className='ModalCart'>
      <span>В корзине:</span>
      <span className='ModalCart-info'>{count ? ` ${totalCount} ${plural(totalCount, {one: 'товар', few: 'товара', many: 'товаров'})} / 
            ${formattedPrice(totalPrice)} ` : " пусто "}</span>
      <button onClick={openModal}>Перейти</button>
      <Modal onDeleteItem={onDeleteItem}
             isOpen={isOpen}
             closeModal={closeModal}
             list={list}
             totalPrice={totalPrice}/>
    </div>
  )
}

export default React.memo(ModalCart);
