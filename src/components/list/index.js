import React, {useCallback} from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import {getCurrency, plural} from "../../utils";

function List({list, onDeleteItem, onSelectItem, setBasket, isModalOpen, basket}){
  const callbacks = {
    onAddItemInBasket: useCallback((e, item) => {
        e.stopPropagation();
        setBasket((prev) => {
          let data = prev[item.code];
          if(data === undefined) {
            data = {
              total: 1,
              ...item
            }
          }else data.total ++;
          return ({
            ...prev,
            [item.code]: {
              ...data
            },
            itemPrice: (prev.itemPrice || 0) + data.price,
            itemsTotal: (prev.itemsTotal || 0) + 1
          })
        })
    }, []),
    onDeleteFromBasket: useCallback((code) => {
      setBasket((prev) => {
        let currentPrice = prev.itemPrice - (prev[code].total * prev[code].price),
            currentTotal = prev.itemsTotal - prev[code].total;
        delete prev[code];
        return {...prev, itemPrice: currentPrice, itemsTotal: currentTotal}
      })
    }, [])
  }
  return (
    <div className='List'>{
      !isModalOpen ?
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onDelete={onDeleteItem} onSelect={onSelectItem} setBasket={setBasket}>
            <div className='Item-actions'>
              {getCurrency(item.price, 'ru-Ru', 'RUB')}
              <button onClick={(e) => callbacks.onAddItemInBasket(e, item)}>
                Добавить
              </button>
            </div>
          </Item>
        </div>
      ) : <div>
            {
              list.map(key => Number.isNaN(+key) === false ?<div key={basket[key].code} className='List-item'>
                <Item item = {{...basket[key]}}>
                <span className='Item-description'>{getCurrency( basket[key].price, 'ru-Ru','RUB')}</span>
                <span className='Item-description'>{basket[key].total} шт</span>
                <button onClick={() => callbacks.onDeleteFromBasket(key)}>Удалить</button>
                </Item></div> : null)
            }
            <div className='Item-total'>
              <b>Итого</b>
              <b>{getCurrency(basket.itemPrice, 'ru-Ru', 'RUB')}</b>
            </div>
          </div>
    }
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  isModalOpen: PropTypes.bool,
  basket: PropTypes.object,
  setBasket: PropTypes.func
};

List.defaultProps = {
  isModalOpen: false,
  basket: {},
  setBasket: () => {}
}

export default React.memo(List);
