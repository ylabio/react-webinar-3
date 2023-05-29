import {memo} from 'react';
import PropTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {Link} from "react-router-dom";
import {useLanguage} from "../../hooks";

function ItemBasket(props) {
  const {t} = useLanguage()

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: () => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={props.redirectTo}
              onClick={props.onRedirect}
              className={cn('link')}
        >
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{`${numberFormat(props.item.amount || 0)} ${t('Pieces')}`}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{t('Delete')}</button>
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
  redirectTo: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
  onRedirect: PropTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {
  },
  onRedirect: () => {
  },
}

export default memo(ItemBasket);
