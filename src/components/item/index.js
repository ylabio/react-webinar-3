import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { formatPrice } from '../../utils';
import './style.css';

function Item(props){

  const cn = bem('Item');

  const callbacks = {
    onClick: () => {
      props.onClick(props.item.code);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {formatPrice(props.item.price) + ' ₽'}
      </div>
      {props.item.hasOwnProperty('count') && 
        <div className={cn('count')}>
          {`${props.item.count} шт`}
        </div>
      }
      <div className={cn('actions')}>
        <button onClick={callbacks.onClick}>
          {props.actionName}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number
  }).isRequired,
  actionName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  onClick: () => {}
}

export default React.memo(Item);
