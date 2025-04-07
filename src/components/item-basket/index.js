import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../store/use-language';
import translations from '../../locales/index'

function ItemBasket({ item, onRemove= () => {}, onClose = () => {} }) {
  const cn = bem('ItemBasket');
  const { language } = useLanguage();

  const callbacks = {
    onRemove: e => {
      e.stopPropagation();
      e.preventDefault();
      onRemove(item._id);
    },
    onClose: () => {
      onClose();
    }
  };

  return (
    <Link to={`/product/${item._id}`} className={cn()} onClick={callbacks.onClose}>
      {/* <div className={cn('code')}>{props.item._id}</div> */}
      <h4 className={cn('title')}>{item.title}</h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} шт</div>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={(e) => callbacks.onRemove(e)} title={translations[language].delete} />
        </div>
      </div>
    </Link>
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
  onClose: propTypes.func,
};

export default memo(ItemBasket);
