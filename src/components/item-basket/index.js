import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import {Link} from 'react-router-dom';
import useStore from '../../store/use-store';
import {localization} from '../../localization';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const store = useStore();

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link className={cn('title')} to={`/item/${props.item._id}`} onClick={callbacks.closeModal}>{props.item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} {localization.currency.rub[props.language]}</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} <span>{localization.itemBasket.amount[props.language]}</span></div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{localization.itemBasket.delete[props.language]}</button>
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
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
