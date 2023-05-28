import {memo, useContext} from 'react';
import propTypes from 'prop-types';
import PropTypes from 'prop-types';
import {numberFormat, translate} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import {NavLink} from "react-router-dom";
import {LanguageContext} from "../../store/context";
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const activeLanguage = useContext(LanguageContext)

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <NavLink
          to={props.link}
          className={cn('link')}
          onClick={() => props.onOpen()}
        >
          {props.item.title}
        </NavLink>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {translate('units', activeLanguage)}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{translate('delete', activeLanguage)}</button><
        /div>
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
  link: propTypes.string,
  onRemove: propTypes.func,
  onOpen: propTypes.func
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
