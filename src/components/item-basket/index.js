import { memo } from 'react';
import propTypes from 'prop-types';
import { numberFormat, plural } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router';
import useStore from '../../store/use-store';
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const navigate = useNavigate();
  const store = useStore();

  const callbacks = {
    handleClick: () => {
      store.actions.modals.close();
      navigate(`/items/${props.item._id}`);
    },
    onRemove: () => props.onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      <div onClick={() => callbacks.handleClick()} className={cn('title')}>{props.item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)}&nbsp;
          {props.locale.pcs}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.locale.deleteBtnTitle}</button>
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
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => { },
}

export default memo(ItemBasket);
