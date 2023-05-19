import React from 'react';
import List from '../list';
import PropTypes from 'prop-types';
import ModalLayout from '../modal-layout';
import './style.css';

const Modal = ({closeModel, cartItems, removeItem, sumCart}) => {
  return (
    <ModalLayout closeModel={closeModel}>
      <div className='Modal-wrapper'>
        <div className='Modal__header'>
          <h2 className='Modal__title'>Корзина</h2>
          <div className='Modal__button'>
            <button onClick={closeModel}>Закрыть</button>
          </div>
        </div>
        <div className='Modal__basket'>
          <div className='Modal__margin'></div>
          <List list={cartItems} actionButton={removeItem} buttonName='Удалить' />
          <div className='Modal__total'>
            Итого <span>{sumCart} ₽</span>
          </div>
          <div className='Modal__margin-bottom'></div>
        </div>
      </div>
    </ModalLayout>
  );
};

Modal.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
  closeModel: PropTypes.func,
  removeItem: PropTypes.func,
  sumCart: PropTypes.string,
};

Modal.defaultProps = {
  closeModel: () => {},
};

export default React.memo(Modal);
