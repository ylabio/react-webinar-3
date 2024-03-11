import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import { useTranslation } from '../../utils/useTranslition';
import { Link } from 'react-router-dom';
function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };
    const handleLinkClick = (e) => {
        props.closeModal(); 
    };
    const t = useTranslation();
  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
          <div className={cn('title')} ><Link className={cn('link')} onClick={handleLinkClick} to={`/items/${props.item._id}`}>
              {props.item.title}
          </Link></div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
              <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {t('pcs')}</div>
        <div className={cn('cell')}>
                  <button onClick={callbacks.onRemove}>{t('remove')}</button>
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
  onRemove: () => {},
}

export default memo(ItemBasket);
