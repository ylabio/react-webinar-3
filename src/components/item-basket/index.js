import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat,langArr} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import './style.css';


function ItemBasket(props) {
  const router = useNavigate();

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };
  
  function onClickFunc(){
    router(props.link);
    props.closeModal();
  }

  
  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <span onClick={onClickFunc}>{props.item.title}</span>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {langArr.pcs[props.language]}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{langArr.remove[props.language]}</button>
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
