import {memo, useContext} from 'react';
import { LanguageContext } from '../../language-provider';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import useStore from "../../store/use-store";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

function ItemBasket(props) {
  const { t } = useContext(LanguageContext); 
  const store = useStore();

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onCloseModal: () => store.actions.modals.close('basket'),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link
          to={`/${props.item._id}`}
          
          onClick={callbacks.onCloseModal}
        >
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {t('pcs')}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{t('buttonRemove')}</button>
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
