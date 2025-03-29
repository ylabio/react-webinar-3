import React from 'react';
import "./style.css"
import Items from "../items";

const defaultModalProps = {
  toggleModal: ()=>{},
  basket:[],
  onDeleteItem: ()=>{},
  calculateTotal: ()=>{}
};

export default function ModalContent( { toggleModal = defaultModalProps.toggleModal,
                                        basket = defaultModalProps.basket,
                                        handleItemAction = defaultModalProps.onDeleteItem,
                                        calculateTotal = defaultModalProps.calculateTotal } ) {

  return (
    <>
      <div className={"modal-header"}>
        <div className={ "modal-close" } onClick={ toggleModal }>✕</div>
      </div>
      <div className="modal-content">
        <h2>Корзина</h2>
        <Items list={ basket } handleItemAction={handleItemAction} modeDelete={true} />
        <div className={ "modal-footer" }>
          <div>Итого:</div>
          <div>{ calculateTotal() + " ₽" }</div>
        </div>
      </div>
    </>
  );
}

