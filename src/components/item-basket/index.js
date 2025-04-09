import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';
import { useTranslation } from '../../translation/TranslationContext';
import { useNavigate } from 'react-router';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const { t } = useTranslation();
  let navigate = useNavigate();

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
    handleNavigate: () => {
      props.onCloseModal();
      navigate(`/articles/${props.item._id}`);
    },
  };

  return (
    <div className={cn()} onClick={callbacks.handleNavigate}>
      {/* <div className={cn('code')}>{props.item._id}</div> */}
      <h4 className={cn('title')}>{props.item.title}</h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} {t('quantity')}
        </div>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={t('removeFromCart')} />
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
  onCloseModal: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
