import React from 'react';
import List from '../list';
import Head from '../head';
import PropTypes from 'prop-types';
import Controls from '../controls';
import CartInfo from '../cart-info';
import './style.css';

function Modal({cart, onDeleteItem, onEntryCart, calculateSum, calculateItems}) {
  return (
  <div className='Modal'>
    <Head title='Корзина' >
      <Controls
      title='Закрыть'
      onEntryCart={onEntryCart}
      />
    </Head>
    <List list={cart} buttonFunction={onDeleteItem} buttonTitle={'Удалить'} />
    <CartInfo title={'Итого'} calculateSum={calculateSum}/>
  </div>
  )
};

Modal.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    subSum: PropTypes.number,
  })).isRequired,
  onDeleteItem: PropTypes.func,
  onEntryCart: PropTypes.func,
  calculateSum: PropTypes.func,
  calculateItems: PropTypes.func,
};

Modal.defaultProps = {
  onDeleteItem: () => {},
  onEntryCart: () => {},
  calculateSum: () => {},
  calculateItems: () => {},
}

export default React.memo(Modal);
