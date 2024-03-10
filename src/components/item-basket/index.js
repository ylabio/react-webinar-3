<<<<<<< HEAD
import {memo, useCallback, useContext} from 'react';
=======
import {memo, useCallback} from 'react';
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
<<<<<<< HEAD
import {Link} from "react-router-dom";
import {useLanguage} from "../../language-provider";

function ItemBasket(props) {

  const { t } = useLanguage()

=======

function ItemBasket(props) {

>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
<<<<<<< HEAD
      <Link to={`/${props.item._id}`} className={cn('title')}>{props.item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {t('things')}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{t('remove')}</button>
=======
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить</button>
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
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
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
