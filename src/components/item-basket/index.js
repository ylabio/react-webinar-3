import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import { Link } from 'react-router-dom';
import useStore from '../../store/use-store';
import { langButton, langText } from '../../constants/language';

function ItemBasket(props) {
  const {language='ru', path=''} = props

  const cn = bem('ItemBasket');

  const store = useStore();

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
        // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  return (
    <div className={cn()}>
      <Link
        onClick={callbacks.closeModal}
        to={`${path}/${props.item._id}`}
        className={cn('title')}>
        {props.item.title}
        </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)}
        {langText.UNITS[language]}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{langButton.REMOVE[language]}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  language: PropTypes.string,
  path: PropTypes.string,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
