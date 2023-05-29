import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { Link } from "react-router-dom"

function Item(props){

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }
console.log('props.buttonAdd', props.buttonAdd)
  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`/${props.item._id}`} className={cn('link')}>{props.item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.buttonAdd}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
  buttonAdd: PropTypes.string
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
