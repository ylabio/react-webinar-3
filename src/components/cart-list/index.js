import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import List from '../list';
import Button from '../button';
import Item from '../item';
import './style.css';
import { formatCurrency } from '../../utils';

function CartList({ list, onDelete = () => {} }) {
  const cn = bem('CartList');
  const totalCost = list.reduce((acc, cur) => acc + cur.price * cur.count, 0);
  return (
    <div className={cn()}>
      {list.length === 0 && <h3>Корзина пуста</h3>}
      {list.length > 0 && (
        <>
          <List
            list={list}
            renderItem={item => (
              <Item
                title={item.title}
                action={
                  <Button
                    color="delete"
                    onClick={() => {
                      onDelete(item.code);
                    }}
                  >
                    Удалить
                  </Button>
                }
              >
                <span>{item.count + ' шт'}</span>
                <span style={{ textAlign: 'end' }}>{formatCurrency(item.price)}</span>
              </Item>
            )}
          />
          <Item className={cn('Total')} action={<div></div>}>
            <strong>Итого:</strong>
            <strong style={{ textAlign: 'end' }}>{formatCurrency(totalCost)}</strong>
          </Item>
        </>
      )}
    </div>
  );
}

CartList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      price: PropTypes.number,
      title: PropTypes.string,
      count: PropTypes.number,
    }),
  ).isRequired,
  onDelete: PropTypes.func,
};

export default CartList;
