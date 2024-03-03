import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import {cn as bem} from '@bem-react/classname';
import './style.css';


function List({ list, onAddItem, onDeleteItem, isBasket = false }) {
  const cn = bem('List');
  const getItems = () => {
    const resultList = [];
    let resultSum = 0;

    list.forEach(item => {
      resultSum += item.price;
      const foundItem = resultList.filter(i => i.code === item.code)[0];
      const indexItem = resultList.indexOf(foundItem);

      indexItem >= 0
        ? resultList[indexItem] = {
          ...item,
          quantity: resultList[indexItem].quantity += 1
        }
        : resultList.push({
          ...item,
          quantity: 1
        });

    });
    return { resultList, resultSum };
  };

  return (
    <div className={cn()}>
      {isBasket
        ? <>
          {getItems().resultList.map(item =>
            <div key={item.code} className={cn('item')}>
              <Item item={item} onAdd={onAddItem} onDelete={onDeleteItem} isBasket />
            </div>
          )}
          <div className={cn('footer')}>
            <p>Итого</p>
            <p>{`${getItems().resultSum}₽`}</p>
          </div>

        </>
        : list.map(item =>
          <div key={item.code} className='List-item'>
            <Item item={item} onAdd={onAddItem} onDelete={onDeleteItem} />
          </div>
        )
      }
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func
};

List.defaultProps = {
  onAddItem: () => {
  },
  onDeleteItem: () => {
  },
};

export default React.memo(List);
