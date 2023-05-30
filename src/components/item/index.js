import {memo, useState} from "react";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import {Link} from 'react-router-dom';

import PropTypes from "prop-types";

import './style.css';

function Item(props){

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => {
      e.preventDefault()
      props.onAdd(props.item._id)
    }
  }

  return (
    <div className={cn()}>
        <Link to={`/product/${props.item._id}`} className={cn('title')}>
          {props.item.title}
        </Link>

      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={(e) => callbacks.onAdd(e)}>Добавить</button>
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
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);