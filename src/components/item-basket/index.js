import { memo } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Button from '../button';
import { useAppContext } from '../../app-context';
import { STRINGS } from '../../const';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const { language } = useAppContext();

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      {/* <div className={cn('code')}>{props.item._id}</div> */}
      <Link to={`/product/${props.item._id}`} className={cn('title')}>{props.item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={STRINGS.DELETE[language]} />
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
