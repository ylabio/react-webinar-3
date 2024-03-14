import {memo} from 'react';
import propTypes from 'prop-types';
import PropTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {Link} from "react-router-dom";


function ItemBasket(props) {


  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      <div onClick={props.closeModal}  className={cn('title')}>
        <Link to={props.link}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.lang === 'ru-RU' ? 'шт': 'pcs'}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.lang === 'ru-RU' ? 'Удалить': 'Remove'}</button>
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
  onRemove: propTypes.func,
  closeModal: propTypes.func,
  lang: PropTypes.string,
}

ItemBasket.defaultProps = {
  onRemove: () => {
  },
}

export default memo(ItemBasket);
