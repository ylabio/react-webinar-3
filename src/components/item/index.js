import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {addSpaceInPrice} from "../../utils";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => {
      e.stopPropagation();
      props.addToBasket(props.item.code);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title} 
      </div>
      <div className={cn('price')}>{addSpaceInPrice(props.item.price)} ₽</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAdd}>
          Добавить
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
  }).isRequired,
  addToBasket: PropTypes.func,
};

Item.defaultProps = {
  addToBasket: () => {
  },
}

export default React.memo(Item);
