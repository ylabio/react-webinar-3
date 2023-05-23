import React from "react";
import PropTypes from "prop-types";
import '../../item/style.css';
import { priceFormatting } from "../../../utils";
import {cn as bem} from '@bem-react/classname';

function ItemCart(props){

  const cn = bem('Item');
  
  const callbacks = {    
    onDeleteItem: () => {
      props.onDeleteItem(props.item.code);
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
        <div className={cn('price')}>
            {props.item.total + ' шт'}
        </div>
        <div className={cn('actions')}>
            <button onClick={callbacks.onDeleteItem}>Удалить</button>
        </div>              
    </div>                   
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,      
    price: PropTypes.number,
    total: PropTypes.number
  }).isRequired,
  onDeleteItem: PropTypes.func,  
};

ItemCart.defaultProps = {
  onDeleteItem: () => {},
}

export default ItemCart;
