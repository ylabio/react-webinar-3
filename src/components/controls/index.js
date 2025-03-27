import React, { memo, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import cartIcon from '../../assets/cart.png';
import Close from '../../assets/close.png';

const Controls = ({ cart, onDeleteItem }) => {
  const [modal, setModal] = useState(false);

  const cn = bem('Modal');

  // Оптимизация вычислений с помощью useMemo
  const { totalItems, totalPrice } = useMemo(() => {
    const totals = cart.reduce(
      (acc, item) => {
        acc.totalItems += item.count;
        acc.totalPrice += item.count * Number(item.price);
        return acc;
      },
      { totalItems: 0, totalPrice: 0 },
    );
    return totals;
  }, [cart]);

  return (
    <>
      <div className="Cart">
        <button className="Cart-button" onClick={() => setModal(!modal)}>
          <img src={cartIcon} alt="cart" width={24} height={24} />
          {cart.length > 0
            ? `${totalItems.toLocaleString('ru-RU')} товара / ${totalPrice.toLocaleString('ru-RU')} ₽`
            : 'Пусто'}
        </button>
      </div>

      {modal && (
        <div className={cn()}>
          <div className={cn('content')}>
            <div className={cn('header')}>
              <h1>Корзина</h1>
              <button onClick={() => setModal(false)}>
                <img src={Close} alt="close" width={20} height={20} />
              </button>
            </div>
            {cart.length > 0 ? (
              cart.map(item => (
                <div className={cn('item')} key={item.code}>
        
                  <p className={cn('title')}>{item.title}</p>          

                  <div className={`${cn('price-container')} `}>
                    <p style={{ marginRight: "auto" }}>{item.count} шт</p>
                    <p style={{ textAlign: 'right' }}>{(item.count * Number(item.price)).toLocaleString('ru-RU')} ₽</p>
                    <button
                      style={{ cursor: 'pointer' }}
                      className={cn('button')}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteItem(item.code);
                      }}>
                      Удалить
                    </button>
                  </div>

                </div>
              ))
            ) : (
              <p>Корзина пуста</p>
            )}
            <div className={cn('end')}>
              <p style={{ marginRight: '105px' }}>Итого:</p>
              <p style={{ marginRight: '135px'}}>{totalPrice.toLocaleString('ru-RU')} ₽</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Controls.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default memo(Controls);
