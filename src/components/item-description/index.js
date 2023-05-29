import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function ItemDescription(props){

  const cn = bem('ItemDescription');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }
  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.item.description}</div>
      <div className={cn('title-block')}>Страна производитель:
        <span className={cn('span__bold')}> {props.item.madeIn?.title} ({props.item.madeIn?.code})</span>
      </div>
      <div className={cn('title-block')}>Категория:
        <span className={cn('span__bold')}> {props.item.category?.title}</span>
      </div>
      <div className={cn('title-block')}>Год выпуска:
        <span className={cn('span__bold')}> {props.item.edition}</span></div>
      <div className={cn('actions')}>
        <div className={cn('price')}>Цена:
          <span> {numberFormat(props.item.price)} ₽ </span>
        </div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

ItemDescription.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    madeIn: PropTypes.object,
    category: PropTypes.object,
    edition: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

ItemDescription.defaultProps = {
  onAdd: () => {},
}

export default memo(ItemDescription);
