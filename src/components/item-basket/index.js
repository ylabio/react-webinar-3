import { memo } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import useSelector from '../../store/use-selector';
import { Link } from 'react-router';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const { onRemove = () => {} } = props;

  const select = useSelector(state => ({
    language: state.language.lang,
  }));

  const callbacks = {
    onRemove: e => onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      {/* <div className={cn('code')}>{props.item._id}</div> */}
      <h4 className={cn('title')}>
        <Link to={`/product/${props.item._id}`}>{props.item.title}</Link>
      </h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>
          {select.language === 'eng' && "qt "}
          {numberFormat(props.item.amount || 0)} 
          {select.language === 'ru' && " шт"}
        </div>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button 
            style="delete" 
            onClick={callbacks.onRemove} 
            title={select.language === 'ru' ? "Удалить" : "Delete"}
          />
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
