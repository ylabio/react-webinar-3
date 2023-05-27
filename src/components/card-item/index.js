import React, {memo} from "react";
import { numberFormat } from "../../utils";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

const CardItem = (props) => {
    
    const cn = bem('CardItem');
    
    const callbacks = {
        onAdd: (e) => props.onAdd(props.card._id),
      }
    return (
        <div className={cn()}>
            <ul className={cn('list')}>
                <li className={cn('string')}>{props.card.description}</li>
                <li className={cn('string')}>Страна Производитель: <span className={cn('info')}>{props.card.madeIn?.title}</span> </li>
                <li className={cn('string')}>Категория: <span className={cn('info')}>{props.card.category?.title}</span></li>
                <li className={cn('string')}>Год Выпуска: <span className={cn('info')}>{props.card.edition}</span></li>
                <li className={cn('string')}>Цена: <span className={cn('info')}>{numberFormat(props.card.price)} ₽</span></li>
            </ul>
            <button className={cn('btn')} onClick={callbacks.onAdd}>Добавить</button>
        </div>
    )
}

CardItem.PropTypes = {
    card: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      description: PropTypes.string,
      category: PropTypes.object,
      madeIn: PropTypes.object,
      edition: PropTypes.number,
      price: PropTypes.number,
    }).isRequired,
    onAdd: PropTypes.func,
  }
  
  CardItem.defaultProps = {
    onAdd: () => {},
  }

export default memo(CardItem)