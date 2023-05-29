import {memo} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {translateWord} from '../../utils';
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),

    closeModal: () => props.onClose(),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={callbacks.closeModal}>
        <Link to={props.productLink + props.item._id}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.selectedLanguage === "ru-RU" ? "шт" : ""}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{translateWord("Удалить", props.selectedLanguage)}</button></div>
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
  selectedLanguage: PropTypes.string,
  productLink: PropTypes.string,
  onRemove: propTypes.func,
  onClose: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {},
  selectedLanguage: "ru-RU",
  productLink: "/products/"
}

export default memo(ItemBasket);
