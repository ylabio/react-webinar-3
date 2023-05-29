import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function ItemSingleProduct(props){

  const cn = bem('ItemSingleProduct');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.article._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('description')}>
        {props.article.description} 
      </div>
      <div className={cn('description')}>Страна происзводитель: <b>{props.article.madeIn?.title} ({props.article.madeIn?.code})</b></div>
      <div className={cn('description')}>Категория: <b>{props.article.category?.title}</b></div>
      <div className={cn('description')}>Год выпуска: <b>{props.article.edition}</b></div>

      <div className={cn('price')}>Цена: {numberFormat(props.article.price)} ₽</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

ItemSingleProduct.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    })
  }).isRequired,
  onAdd: PropTypes.func,
};

ItemSingleProduct.defaultProps = {
  onAdd: () => {},
}

export default memo(ItemSingleProduct);
