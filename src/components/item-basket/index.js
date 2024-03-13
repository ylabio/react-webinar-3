import {memo, useCallback, useContext} from 'react';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import { NavLink } from 'react-router-dom';
import { LanguageContext } from '../../languages/languagesContext';


function ItemBasket(props) {

  let { dict } = useContext(LanguageContext)

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onLink:(e)=>props.closeModal()
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
      <NavLink to={props.link} onClick={callbacks.onLink}>
        {props.item.title}
      </NavLink>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {dict.things}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{dict.remove}</button>
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
  closeModal: PropTypes.func,
  link: PropTypes.string
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  closeModal:()=>{}
}

export default memo(ItemBasket);
