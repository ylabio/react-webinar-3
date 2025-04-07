import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import useTranslate from '../../hooks/useTranslate';
import './style.css';

function ItemBasket({ item, onRemove = () => {} }) {
  const cn = bem('ItemBasket');
  const t = useTranslate();

  const callbacks = {
    onRemove: e => onRemove(item._id),
  };

  return (
    <div className={cn()}>
      <Link to={`/articles/${item._id}`} className={cn('title')}>
        <h4>{item.title}</h4>
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} {t('pieces')}</div>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={t('remove')} />
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
