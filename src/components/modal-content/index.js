import React from 'react';
import "./style.css"
import Item from "../item";

export default function ModalContent( { toggleModal, basket, onDeleteItem } ) {
  return (
    <>
      <div className={"modal-header"}>
        <div className={ "modal-close" } onClick={ toggleModal }>X</div>
      </div>
      <div className="modal-content">
        <h2>Корзина</h2>
        { basket.map( ( item, index ) => (
          <div key={ item.code }>
            <Item item={ item } index={ index } addItem={ onDeleteItem } modeDelete={ true }/>
          </div>
        ) ) }
        <div className={ "modal-footer" }></div>
      </div>
    </>
  );
}

