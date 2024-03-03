import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import Item from '../item';
import './style.css';

function Modal({list, sumPrices, active, onClose, onDeleteItemInCart}) {
  if (!active) {
    return null;
  }
  return (
    <div className='Modal'>
      <div className='Modal-content'>
        <Head title='Корзина'>
          <button onClick={onClose}>Закрыть</button>
        </Head>
        <div className='Modal-items'>
          {list.map(item =>
            <div key={item.code} className='Cart-item'>
              <Item item={item} buttonTitle='Удалить' active={true} onDeleteInCart={onDeleteItemInCart}/>
            </div>
          )}
        </div>
        <div className='Modal-footer'><span>Итого</span> {sumPrices} ₽</div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  sumPrices: PropTypes.number,
  active: PropTypes.bool,
  onClose: PropTypes.func,
  onDeleteItemInCart: PropTypes.func
};

Modal.defaultProps = {
  onClose: () => {
  },
  onDeleteItemInCart: () => {
  },
  sumPrices: 0,
  active: false
}

export default React.memo(Modal);
