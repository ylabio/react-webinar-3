import {memo} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

function ItemArticle(props) {

  const cn = bem('ItemArticle');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  };

  return (
    <div className={cn()}>
      <p className={cn('description')}>{props.item.description}</p>
      <div className={cn('cell')}>Страна производитель:<b> {props.madeIn.title} <span>(</span>{props.madeIn.code}<span>)</span></b></div>
      <div className={cn('cell')}>Категория:<b> {props.category.title}</b></div>
      <div className={cn('cell')}>Год выпуска:<b> {props.item.edition}</b></div>
      <div className={cn('price')}>
        Цена:
        <span>  {numberFormat(props.item.price)} ₽</span>
      </div>
      <div className={cn('cell')}><button onClick={callbacks.onAdd}>Добавить</button></div>
    </div>
  )
}

ItemArticle.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    price: PropTypes.number,
    edition: PropTypes.number,
  }).isRequired,
  category: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
  }).isRequired,
  madeIn: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    code: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  onAdd: propTypes.func,
}

ItemArticle.defaultProps = {
  onAdd: () => {},
}

export default memo(ItemArticle);
