import { memo, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import routes from "../../store/routes";

import useDictionary from "../../store/use-dictionary";

import { numberFormat } from "../../utils";

import "./style.css";
function Item(props) {
  const { currentDictionary } = useDictionary();

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link
        to={routes.product(props.item._id)}
        className={cn('title')}
      >
        {props.item.title}
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{currentDictionary.main.item.add}</button>
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
  loadProductInfo: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {
  },
}

export default memo(Item);
