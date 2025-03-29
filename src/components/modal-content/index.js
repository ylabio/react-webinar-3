import React from 'react';
import "./style.css"
import Item from "../item";
import { generateUniqueKey } from "../../utils";

export default function ModalContent( { toggleModal, basket, onDeleteItem, calculateTotal } ) {
  return (
    <>
      <div className={"modal-header"}>
        <div className={ "modal-close" } onClick={ toggleModal }>✕</div>
      </div>
      <div className="modal-content">
        <h2>Корзина</h2>
        { basket.map( ( item, index ) => (
          <div key={ generateUniqueKey(10) }>
            <Item item={ item } index={ index } addItem={ onDeleteItem } modeDelete={ true }/>
          </div>
        ) ) }
        <div className={ "modal-footer" }>
          <div>Итого:</div>
          <div>{ calculateTotal() + " ₽" }</div>
        </div>
      </div>
    </>
  );
}

