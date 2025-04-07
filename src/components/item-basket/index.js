import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import { Link } from 'react-router-dom';

function ItemBasket({ item, onRemove, closeModal }) {
  // Добавляем closeModal в пропсы
  const cn = bem('ItemBasket');

  const handleRemove = e => {
    e.stopPropagation();
    onRemove(item._id);
  };

  return (
    <div className={cn()}>
      {' '}
      {/* Добавляем обработчик клика */}
      <Link to={`/product/${item._id}`} className={cn('title')} onClick={closeModal}>
        {item.title}
      </Link>
      <div className={cn('right')} onClick={e => e.stopPropagation()}>
        <div className={cn('cell')}>{numberFormat(item.amount)} шт</div>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button onClick={handleRemove} style="delete" title="Удалить" />
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default memo(ItemBasket);
