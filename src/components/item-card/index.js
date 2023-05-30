import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { numberFormat } from '../../utils'
import './style.css';

function CardContent(props) {

  const cn = bem('Card');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.card._id)
  };


  return (
    <article className={cn()}>
      <p className={cn('item')}>{props.card.description}</p>
      <p className={cn('item')}> {props.madeIn}
        <b> {props.card.madeIn?.title} ({props.card.madeIn?.code})</b>
      </p>
      <p className={cn('item')}> {props.category}
        <b> {props.card.category?.title}</b>
      </p>
      <p className={cn('item')}> {props.edition}
        <b> {props.card.edition}</b>
      </p>
      <p className={cn('item', { weight: "bold" })}> {props.price}  {numberFormat(props.card.price)} ₽</p>
      <button onClick={callbacks.onAdd}> {props.buttonName} </button>
    </article>

  );

}

CardContent.propTypes = {
  card: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.object,
    category: PropTypes.object,
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAdd: propTypes.func,
  madeIn: PropTypes.string,
  category: PropTypes.string,
  edition: PropTypes.string,
  price: PropTypes.string,
  buttonName: PropTypes.string,
}

CardContent.defaultProps = {
  onAdd: () => { },
}

export default memo(CardContent);
