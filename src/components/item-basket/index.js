import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';
import {useNavigate} from "react-router-dom";
import useSelector from "../../store/use-selector";

function ItemBasket(props) {
  const lang = useSelector(state => state.language.language);
  const translations = {
    ru: {
      amount: 'шт',
      delete: 'Удалить',
    },
    en: {
      amount: 'pcs',
      delete: 'Delete',
    },
  }
  const cn = bem('ItemBasket');
  const navigate = useNavigate();

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
    onOpen: e => {
      navigate('/' + props.item._id);
      props.onCloseModal();
    },
  };

  return (
    <div className={cn()}>
      {/* <div className={cn('code')}>{props.item._id}</div> */}
      <h4 onClick={callbacks.onOpen} className={cn('title')}>{props.item.title}</h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {translations[lang].amount}</div>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={translations[lang].delete} />
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

export default memo(ItemBasket);
