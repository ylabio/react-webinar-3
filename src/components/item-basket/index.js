import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import { Link } from 'react-router-dom';

function ItemBasket({item, translations, onRemove, link, onCloseModal}) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => onRemove(item._id)
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={link} onClick={() => onCloseModal()}>{item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>{`${numberFormat(item.amount || 0)} ${numberFormat(item.amount || 0)  > 1 ? translations.few : translations.one}`}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{translations.removeBtn}</button>
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
  onRemove: propTypes.func,
  onCloseModal: propTypes.func,
  translations: PropTypes.object
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
