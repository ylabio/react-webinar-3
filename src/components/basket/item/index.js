import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import Counter from "../../counter";
import {RUBLE_CODE, UNIT} from "../../../constants";
import Price from "../../price";

function Item({item, onDelete}) {
  const cn = bem('Item');

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      onDelete(item);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>
        <span>{item.title}</span>
        <div className={cn('info')}>
          <Price amount={item.price} currency={RUBLE_CODE}/>
          {item.count && <Counter count={item.count} unit={UNIT}/>}
        </div>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default React.memo(Item);
