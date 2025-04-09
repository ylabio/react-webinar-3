import { memo } from 'react';
import { useNavigate} from 'react-router-dom';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';

function ItemBasket({ item, text, onRemove=() => {}, navigateTo=`/product/${item._id}` }) {
  const cn = bem('ItemBasket');
  const navigate = useNavigate();

  const clickHandler = (event) => {
    if (event.target.tagName === 'BUTTON') {
      return;
    }
    navigate(navigateTo);
  }

  return (
    <div onClick={clickHandler} className={cn()}>
      <h4 className={cn('title')}>{item.title}</h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} {text.item}</div>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={() => { onRemove(item._id) }} title={text} />
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
