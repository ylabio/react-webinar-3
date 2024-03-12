import {memo} from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import useStore from "../../store/use-store";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

function ItemBasket(props) {
  const { item, onRemove, t } = props;    
  const store = useStore();
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => onRemove(item.item._id),
    onCloseModal: () => store.actions.modals.close('basket'),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`/item/${item.item._id}`} onClick={callbacks.onCloseModal}>
          {item.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(item.item.amount || 0)} {t('pcs')}</div>
        <div className={cn('cell')}>
          <button onClick={() => onRemove(item.item._id)}>{t('buttonRemove')}</button>
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
  t: PropTypes.func
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
