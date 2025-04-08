import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const callbacks = {
    onRemove: e => {
      e.stopPropagation();
      props.onRemove(props.item._id);
    },
    onItemClick: () => {
      if (props.closeModal) {
        props.closeModal();
      }
      navigate(`/article/${props.item._id}`);
    }
  };

  return (
    <div className={cn()} onClick={callbacks.onItemClick}>
      {/* <div className={cn('code')}>{props.item._id}</div> */}
      <h4 className={cn('title')}>{props.item.title}</h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {t('pcs')}</div>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title="btn-delete" />
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
  closeModal: PropTypes.func
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  closeModal: () => {}
};

export default memo(ItemBasket);
