import {memo, useContext} from 'react';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {LanguageContext} from "../../contexts";
import './style.css';

function ItemBasket(props) {

  const translate = useContext(LanguageContext);

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
        <Link to={'/product/' + props.item._id}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)}&nbsp;{translate('шт')}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{translate('Удалить')}</button>
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
  onRemove: PropTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
