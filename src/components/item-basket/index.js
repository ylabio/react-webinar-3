import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';
import { useNavigate } from 'react-router';

function ItemBasket(props = {item: {}, onRemove: () => {}, closeModal: () => {} }) {
  const cn = bem('ItemBasket');

  const navigate = useNavigate(); 

  const handleClick = useCallback((e) => {
    e.preventDefault();
    props.closeModal();
    navigate(`/articles/${props.item._id}`); 
  }, [props.closeModal, props.item._id, navigate]);

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
  };

  return (
    <div className={cn()} onClick={handleClick}>
      <h4 className={cn('title')}>{props.item.title}</h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title="Удалить" />
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
  onRemove: PropTypes.func,
  closeModal: PropTypes.func,
};


export default memo(ItemBasket);
