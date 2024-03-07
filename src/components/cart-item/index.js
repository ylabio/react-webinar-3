
import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Button from '../button';
import { priceFormatter } from '../../utils';



function CartItem( props ) {

  const callbacks = {
    onDelete: () => {
      props.onDelete(props.item.code)
    }
  }

  const cn = bem('CartItem');

  return (
    <div className={cn()} >
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('info')}>
        <div className={cn('price')}>{priceFormatter(parseInt(props.item.price.replace(/\s/g, "")))}</div>
        <div className={cn('count')}>{props.item.count} шт</div>
        <Button onClick={callbacks.onDelete} title={'Удалить'}/>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  title: PropTypes.string,
  onDelete: PropTypes.func,
};

CartItem.defaultProps = {
  onDelete: () => {
  },
}

export default CartItem;