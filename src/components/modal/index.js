import React from "react";
import './style.css';
import PropTypes from "prop-types";
import Head from "../head";
import Controls from "../controls";
import List from "../list";
import Item from "../item";

function Modal({ onClose, deleteItem, getBasket }) {
  return (
    <div className="Modal-overlay">
      <div className="Modal-content">
        <Head title='Корзина'>
          <Controls goToBasket={onClose} place='basket'/>
        </Head>
        <div className={'Basket-list'}>
          {getBasket().itemsCount && getBasket().itemsCount > 0 ? (
            <>
              <List list={getBasket().basket} deleteItem={deleteItem} getBasket={getBasket} place='basket'/>
              <div className={'Total-container'}>
                <div className={'Final-price'}>Итого</div>
                <div className={'Final-price Total-amount'}>{getBasket().finalPrice} ₽</div>
              </div>
            </>
          ) : (
            <p className={'Empty-basket'}>Корзина пуста.</p>
          )}
        </div>

      </div>
    </div>
  );
}


Modal.propTypes = {
  onClose: PropTypes.func,
  deleteItem: PropTypes.func,
  getBasket: PropTypes.func,
};

Modal.defaultProps = {
  onClose: () => {},
  deleteItem: () => {},
  getBasket: () => {},
};

export default React.memo(Modal);
