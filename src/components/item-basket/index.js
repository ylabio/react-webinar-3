import { memo } from 'react';
import propTypes from 'prop-types';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';
import { Paths } from '../../routes/paths';
import { useNavigate } from 'react-router';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const navigate = useNavigate();

  const callbacks = {
    onRemove: e => {
      e.stopPropagation();
      props.onRemove(props.item._id);
    },
    onOpenProduct: () => {
      console.log(props.item._id, 'onOpenProduct');
      navigate(`${Paths.ARTICLE}/${props.item._id}`);
    },
  };

  return (
    <div role="button" tabIndex="0" onClick={callbacks.onOpenProduct} className={cn()}>
      {/* <div className={cn('code')}>{props.item._id}</div> */}
      <h4 className={cn('title')}>{props.item.title}</h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={props.t('Delete')} />
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
  t: PropTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
