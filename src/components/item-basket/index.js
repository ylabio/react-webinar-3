import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import { Link } from 'react-router-dom';
import useStore from '../../store/use-store';
import useTranslation from '../../hooks/use-translation';
import './style.css';

function ItemBasket({ item, onRemove = () => {} }) {
  const cn = bem('ItemBasket');
  const store = useStore();
  const { t } = useTranslation();

  const callbacks = {
    onRemove: e => onRemove(item._id),
    onLinkClick: useCallback(() => {
      store.actions.modals.close();
    }, [store]),
  };

  return (
    <div className={cn()}>
      {/* <div className={cn('code')}>{props.item._id}</div> */}
      <Link 
        to={`/product/${item._id}`} 
        className={cn('title')}
        onClick={callbacks.onLinkClick}
      >
        {item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} {t('pcs')}</div>
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
