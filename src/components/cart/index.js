import React from 'react';
import PropTypes from 'prop-types';
import Title from '../title';
import List from '../list';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Cart({ goodsList, onClick, amount }) {
  const cn = bem('Cart');
  return (
    <section className={cn()}>
      <Title title="Корзина" />
      <List
        list={goodsList}
        onClick={onClick}
        buttonText={'Удалить'}
        getQuantity={item => item.count || 0}
      />
      <div className={cn('box')}>
        <h4 className={cn('total')}>Итого:</h4>
        <h4 className={cn('total')}>{amount} ₽</h4>
      </div>
    </section>
  );
}

Cart.propTypes = {
  goodsList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
};

export default React.memo(Cart);
