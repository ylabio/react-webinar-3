import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from '@bem-react/classname';
import { priceFormatting } from "../../utils";

function Item(props){

  const cn = bem('Item');
  
  const callbacks = {    
    onAddToOrder: () => {
      props.onAddToOrder(props.item.code);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {priceFormatting(props.item.price)}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAddToOrder}>
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
    price: PropTypes.number
  }).isRequired,
  onAddToOrder: PropTypes.func,  
};

Item.defaultProps = {
  onAddToOrder: () => {},
}

export default React.memo(Item);
