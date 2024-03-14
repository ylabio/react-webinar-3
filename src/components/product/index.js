import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import {numberFormat} from "../../utils";
import PropTypes from "prop-types";
import React, {memo} from "react";
import './style.css';

function Product(props) {

  const cn = bem('Product');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('text')}>{props.item.description}</div>
      <div className={cn('text')}>
        Страна производитель:
        <span>{` ${props.item.madeIn.title} (${props.item.madeIn.code})`}</span>
      </div>
      <div className={cn('text')}>Категория: <span>{props.item.category.title}</span></div>
      <div className={cn('text')}>Год выпуска: <span>{props.item.edition}</span></div>
      <div className={cn('price')}>Цена: {numberFormat(props.item.price)} ₽</div>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

Product.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }).isRequired,
    category: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,
    edition: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

Product.defaultProps = {
  onAdd: () => {},
}

export default memo(Product);
