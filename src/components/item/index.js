import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const handleAddItemClick = () => {
    props.onAction(props.item);
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        <span>{props.item.price} ₽</span>
      </div>
      {props.item.count > 0 && 
        <div className={cn('count')}>{props.item.count} шт</div>
      }
      <div className={cn('actions')}>
        <Button text={props.actionText} onAction={handleAddItemClick}/> 
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
  actionText: PropTypes.string,
  onAction: PropTypes.func,
};

Item.defaultProps = {
  onAction: () => {
  },
}

export default React.memo(Item);
