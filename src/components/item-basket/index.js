import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';
import {useDictionary} from "../../app/translations/useDictionary";

function ItemBasket({ item, onRemove = () => {}, onOpen = () => {} }) {
  const cn = bem('ItemBasket');
  const { t } = useDictionary();
  const callbacks = {
    onRemove: (e) => {
      e.stopPropagation();
      onRemove(item._id);
    },
    onOpen: () => {onOpen(item._id)},
  };

  return (
    <div className={cn()} onClick={callbacks.onOpen}>
      <h4 className={cn('title')}>{item.title}</h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} {t('pcs')}</div>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={(e) => callbacks.onRemove(e)} title={t('remove')} />
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
