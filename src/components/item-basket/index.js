import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from '../../utils';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import {useNavigate, Link} from 'react-router-dom';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  // const navigate = useNavigate();

  // const onNavigateHandler = () => {
  //   props.onClose();
  //   navigate(props.item._id);
  // };

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      {/* <div className={cn('title')}>
        <span className={cn('title-navigate')} onClick={onNavigateHandler}>
          {props.item.title}
        </span>
      </div> */}
      <div className={cn('title')}>
        <Link
          className={cn('title-navigate')}
          to={props.path}
          onClick={() => props.onClose()}
        >
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} шт
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить</button>
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
  onClose: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {},
};

export default memo(ItemBasket);
