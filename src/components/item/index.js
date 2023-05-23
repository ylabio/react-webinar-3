import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from '@bem-react/classname';

function Item(props){

  const cn = bem('Item');

  const callbacks = {
    functionResolver: () => {
      props.functionResolver(props.item.code);
    }
  }
  
  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{Intl.NumberFormat('ru-RU').format(props.item.price)} ₽ </div>
      {props.item.count && (<div className={cn('count')}>{props.item.count} шт</div>)}
      <div className={cn('actions')}>
        <button onClick={callbacks.functionResolver}>
          {props.buttonTitle}
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
  functionResolver: PropTypes.func,
};

Item.defaultProps = {
  functionResolver: () => {},
}

export default React.memo(Item);
