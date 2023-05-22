import React, {useState} from "react";
import './style.css';
import List from "../list";
import Head from "../head";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';

const Cart = ({list, isOpened, setOpened, onDeleteItem}) => {
    
    const cn = bem('Cart');
    const totalCost = list.reduce((sum, item) => sum + item.price * item.count, 0);

    return (
      <div className={isOpened ? (cn() + ' isOpened') : cn()}>
        <div className={cn('content')}>
            <div className={cn('header')}>
                <div className={cn('title')}>
                    <Head title='Корзина'/>
                </div>
                <div className={cn('close-button')}>
                    <button onClick={() => setOpened(false)}>Закрыть</button>
                </div>
            </div>
            <div className={cn('list')}>
                {!list.length ? (
                <div><h2>Корзина пуста</h2></div>) : (
                <div>
                    <List list={list} functionResolver={onDeleteItem} buttonTitle='Удалить'/>
                <div className={cn('footer')}>
                    <div className={cn('result')}>
                        <div>Итого</div>
                        <div>{totalCost} ₽</div>
                    </div>
                </div>
                </div>)}
            </div>
        </div>
      </div>
    );
  };

  Cart.propTypes = {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        count: PropTypes.number,
      })
    ).isRequired,
    isOpened: PropTypes.bool,
    setOpened: PropTypes.func,
    onDeleteItem: PropTypes.func
  };

  Cart.defaultProps = {
    setOpened: () => {},
    onDeleteItem: () => {}
  }
  
  export default React.memo(Cart);