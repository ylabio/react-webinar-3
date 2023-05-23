import React from 'react';
import PropTypes from 'prop-types';
import ModalLayout from '../modal-layout';
import ModalFooter from '../modal-footer';
import ItemCart from '../item-cart';
import './style.css';
import Head from '../head';
import List from '../list';

function Modal({ showModal, cart, deleteItem, sum }) {
  return (
    <ModalLayout showModal={showModal}>
      <div className="ModalContainer">
        <Head title="Корзина" action={showModal} actionTitle="Закрыть" />

        <div className="border"></div>
        <List
          render={(item) => (
            <ItemCart
              key={item.code}
              code={item.code}
              title={item.title}
              price={item.price}
              cnt={item.cnt}
              deleteItem={deleteItem}
            />
          )}
          list={cart}
        />
        <ModalFooter sum={sum} />
      </div>
    </ModalLayout>
  );
}

Modal.propTypes = {
  showModal: PropTypes.func,
  cart: PropTypes.array,
  deleteItem: PropTypes.func,
  sum: PropTypes.string,
};

Modal.defaultProps = {
  deleteItem: () => {},
  showModal: () => {},
};

export default React.memo(Modal);
