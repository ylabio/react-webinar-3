import React from 'react';
import PropTypes from 'prop-types';
import ModalLayout from '../modal-layout';
import ModalFooter from '../modal-footer';

import './style.css';
import Head from '../head';
import List from '../list';

function Modal({ showModal, items, deleteItem, sum }) {
  return (
    <ModalLayout showModal={showModal}>
      <div className="ModalContainer">
        <Head title="Корзина" action={showModal} actionTitle="Закрыть" />
        <div className="border"></div>
        <List list={items} action={deleteItem} actionTitle="Удалить" />
        <ModalFooter sum={sum} />
      </div>
    </ModalLayout>
  );
}

Modal.propTypes = {
  showModal: PropTypes.func,
  items: PropTypes.array,
  deleteItem: PropTypes.func,
  sum: PropTypes.number,
};

Modal.defaultProps = {
  deleteItem: () => {},
};

export default React.memo(Modal);
