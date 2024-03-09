import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {numberFormat} from '../../utils';
import './style.css';

function ItemCard({card, onAdd}) {

  const cn = bem('Item-card');

	const callbacks = {
    onAdd: (e) => onAdd(card._id)
  }

  return (
    <div className={cn()}>
      <p className={cn('text')}> {card.description} </p>
      <p className={cn('text')}> Страна производитель: <b>{`${card.madeIn?.title} (${card.madeIn?.code})`}</b> </p>
      <p className={cn('text')}> Категория: <b>{card.category?.title}</b> </p>
      <p className={cn('text')}> Год выпуска: <b>{card.edition}</b> </p>
      <p className={cn('price')}> <b>Цена: {numberFormat(card.price)} ₽</b> </p>
      <button className={cn('button')} onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

ItemCard.propTypes = {
  card: PropTypes.shape( {
    _id: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    madeIn: PropTypes.object,
    category: PropTypes.object,
    edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

ItemCard.defaultProps = {
  onAdd: () => {}
}

export default memo(ItemCard);