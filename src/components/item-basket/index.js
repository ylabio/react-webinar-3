import { memo } from 'react';
import { useNavigate} from 'react-router-dom';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';
import text from '../../text';
import useSelector from '../../store/use-selector';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const navigate = useNavigate();

  const select = useSelector(state => ({
    lang: state.language.language || 'ru',
  }))

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
  };

  const clickHandler = (event) => {
    if (event.target.tagName === 'BUTTON') {
      return;
    }
    navigate(`/product/${props.item._id}`);
  }

  return (
    <div onClick={clickHandler} className={cn()}>
      <h4 className={cn('title')}>{props.item.title}</h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={text[select.lang].delButton} />
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

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
