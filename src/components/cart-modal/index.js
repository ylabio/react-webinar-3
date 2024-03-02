import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head/index';
import List from '../list/index';
import CartSum from '../cart-sum/index';
import './style.css';

function CartModal({data, onClose, onDelete}) {

  const handleContentClick = (event) => {
    event.stopPropagation();
  }

  return (
    <div className='Cart-modal' onClick={onClose}> 
      <div className='Cart-modal-content' onClick={handleContentClick}>
        <button className='Cart-modal-close' onClick={onClose}>Закрыть</button>
        <Head title='Корзина' />
        <div className='Cart-modal-items'>
          {data.length > 0
          ? <>
              <List list={data}
                onClick={onDelete}
                buttonText='Удалить'/>
              <CartSum data={data} />
            </>
          : <p className='Cart-modal-empty'>Корзина пуста</p>}
        </div>
      </div>
    </div>
  )
}

CartModal.propTypes = {
  data: PropTypes.array,
  onClose: PropTypes.func,
  onDelete: PropTypes.func
};

CartModal.defaultProps = {
  data: [],
  onClose: () => {},
  onDelete: () => {}
}

export default React.memo(CartModal);