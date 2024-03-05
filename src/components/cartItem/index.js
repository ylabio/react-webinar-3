import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function cartItem(props) {
  const cn = bem('Item');
  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{props.item.price.toLocaleString()}&nbsp;₽</div>
      <div className={cn('count')}>{props.item.count}&nbsp;шт</div>
      <div className={cn('actions')}>
        <Button title={props.btn.title} callback={() => props.btn.callback(props.item.code)} />
      </div>
    </div>
  );
}

cartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  btn: PropTypes.object,
};

export default React.memo(cartItem);
