import React from "react";
import PropTypes from "prop-types";
import {priceFormat} from "../../utils";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddToCart: (e) => {
      e.stopPropagation();
      props.onAddToCart(props.item.code);
    }
  }

  return (
    <div className={cn()}
         onClick={callbacks.onClick}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {priceFormat(props.item.price)}&nbsp;&#8381;
      </div>
      {props.item.count && <div className={cn('count')}>{props.item.count}&nbsp;шт</div>}
      <div className={cn('actions')}>
        <button onClick={callbacks.onAddToCart}>
          {props.itemButtonCaption}
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
    count: PropTypes.number,
  }).isRequired,
  onItemButtonClick: PropTypes.func,
  itemButtonCaption: PropTypes.string.isRequired

};

Item.defaultProps = {
  onItemButtonClick: () => {
  },


}

export default React.memo(Item);
