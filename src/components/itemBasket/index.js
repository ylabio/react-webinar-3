import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {addSpaceInPrice} from "../../utils";
import './style.css';

function Item(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title} 
      </div>
      <div className={cn('price')}>{addSpaceInPrice(props.item.price)} ₽</div>
      <div className={cn('count')}>{props.item.count} шт</div>
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
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {
  }
}

export default React.memo(Item);
