import {memo} from 'react';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: () => props.onRemove(props.item._id)
  };

  const onCloseModal = (e) => {
    if(e.target.tagName === 'A') props.onCloseModal();
  }

  return (
    <div className={cn()}>
      <div className={cn('title')} onClick={onCloseModal}>
        <Link to={props.linkUrl}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)}&nbsp;{props.textData.unit}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.textData.button}</button>
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
  textData: PropTypes.exact({
    unit: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,
  onRemove: PropTypes.func,
  linkUrl: PropTypes.string.isRequired,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
