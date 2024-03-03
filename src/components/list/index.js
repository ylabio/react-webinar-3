import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import { cn as bem } from '@bem-react/classname';
import { TEXT } from "../constants";
import './style.css';


function List(props) {
  const { list, onAddItem, onDeleteItem, isBasket } = props;
  const cn = bem('List');

  const getItems = () => {
    const uniqueItems = [...new Set(list)];
    let totalPrice = 0;
    const resultList = uniqueItems.map((uniqueItem) => {
      const quantity = list.filter(el => el.code === uniqueItem.code).length;
      totalPrice += quantity * uniqueItem.price;
      return {
        ...uniqueItem,
        quantity,
        price: quantity * uniqueItem.price,
      };
    });
    return { resultList, totalPrice };
  };

  const items = getItems();

  const renderFooter = () => {
    if (!isBasket) return <></>;
    return (
      <div className={cn('footer')}>
        <p>{TEXT.TOTAL}</p>
        <p>{`${items.totalPrice} ₽`}</p>
      </div>
    );
  };
  const renderList = isBasket ? items.resultList : list;
  return (
    <div className={cn()}>
      {renderList.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item item={item} onAdd={onAddItem} onDelete={onDeleteItem} isBasket={isBasket} />
        </div>
      )}
      {renderFooter()}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  isBasket: PropTypes.bool,
};

List.defaultProps = {
  isBasket: false
};

export default React.memo(List);
