import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { useTranslation } from '../../translation/use-translation';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../store/use-store';
import PropTypes from 'prop-types';
import Button from '../button';
import { NavLink } from 'react-router-dom';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const { t } = useTranslation();
  const store = useStore();

  const callbacks = {
    onRemove: () => {
      props.onRemove(props.item._id);
    },
    onNavigate: e => {
      store.actions.modals.close();
    },
  };

  return (
    <NavLink to={`/article/${props.item._id}`} className={cn()} onClick={callbacks.onNavigate}>
      <h4 className={cn('title')}>{props.item.title}</h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          <div onClick={e => e.preventDefault()}>
            <Button style="delete" onClick={callbacks.onRemove} title={t('delete')} />
          </div>
        </div>
      </div>
    </NavLink>
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

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
