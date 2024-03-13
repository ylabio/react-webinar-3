import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";
import useSelector from "../../store/use-selector";

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link to = {props.link || `/product/${props.item._id}`}>
        {props.item.title}
        </Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.locale.add}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
  locale: PropTypes.shape({
      add: PropTypes.string.isRequired
  }).isRequired,
  link: PropTypes.string
};

Item.defaultProps = {
  onAdd: () => {}
};

export default memo(Item);
