import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head/index';
import List from '../list/index';
import CartSummary from '../cart-summary/index';
import './style.css';

function CartModal({data, setIsModalActive, onClick}) {
  return (
    <div className='Cart-modal' onClick={() => setIsModalActive(false)}>
      <div className='Cart-modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='Cart-modal-close' onClick={() => setIsModalActive(false)}>Закрыть</button>
        <Head title='Корзина' />
        <div className='Cart-modal-items'>
          {data.length > 0
          ? <>
              <List list={data}
                onClick={onClick}
                buttonText='Удалить'/>
              <CartSummary data={data} />
            </>
          : <p className='Cart-modal-empty'>Корзина пуста</p>}
        </div>
      </div>
    </div>
  )
}

CartModal.propTypes = {
  data: PropTypes.array,
  setIsModalActive: PropTypes.func,
  onClick: PropTypes.func
};

CartModal.defaultProps = {
  data: [],
  setIsModalActive: () => {},
  onClick: () => {}
}

export default React.memo(CartModal);