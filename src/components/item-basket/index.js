import {memo} from 'react';
import {numberFormat} from '../../utils';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    closeModal: () => props.closeModal()
  };

  return (
    <div className={cn()}>
      <Link className={cn('title')} to={props.link} onClick={callbacks.closeModal}>{props.item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.buttonRemove}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
    link: PropTypes.string
  }).isRequired,
  buttonRemove: PropTypes.string,
  onRemove: PropTypes.func,
  closeModal: PropTypes.func
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  closeModal: () => {}
}

export default memo(ItemBasket);
