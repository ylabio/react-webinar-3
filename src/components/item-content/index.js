import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function ItemContent(props) {

  const cn = bem('ItemContent');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.data._id)
  }
  console.log(props)

  return (
    <div className={cn()}>
      <p className={cn('description')}>
        {props.data.description}
      </p>
      <p className={cn('country')}>
        Страна производитель:
        <span className={cn('country-name')}>{props.data.madeIn.title} ({props.data.madeIn.code})</span>
      </p>
      <p className={cn('category')}>
        {'Категория: '}
        <span className={cn('category-name')}>{props.data.category.title}</span>
      </p>
      <p className={cn('year')}>
        {'Год выпуска: '}
        <span className={cn('year-number')}>{(new Date(props.data.dateCreate)).getFullYear()}</span>
      </p>
      <p className={cn('price')}>
        {`Цена: ${numberFormat(props.data.price)} ₽`}
      </p>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}


ItemContent.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    madeIn: PropTypes.object,
    category: PropTypes.object,
    dateCreate: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

ItemContent.defaultProps = {
  onAdd: () => {},
}

export default memo(ItemContent);
