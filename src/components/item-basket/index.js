import {memo} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import {Link} from "react-router-dom";
import {useLanguage} from "../../LanguageContext";

function ItemBasket(props) {

  const cn = bem('ItemBasket');
  const {tr} = useLanguage()

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onCloseModal: (e) => props.onCloseModal(),
  };

  const linkTo = props.customLink || `/articles/${props.item._id}`;

  return (
    <div className={cn()}>
      <Link  to={linkTo} className={cn('title')} onClick={callbacks.onCloseModal}>{props.item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{tr('deleteBtn')}</button>
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
  customLink: PropTypes.string,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
