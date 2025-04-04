import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { useTranslation } from '../../translation/use-translation';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import { NavLink } from 'react-router-dom';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const { t } = useTranslation();

  const callbacks = {
    onRemove: () => {
      props.onRemove(props.item._id);
    },
  };

  return (
    <NavLink to={`/article/${props.item._id}`} className={cn()}>
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
