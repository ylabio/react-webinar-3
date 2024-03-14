import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import {useNavigate} from "react-router-dom";
import {lang as langData} from '../../lang/data'

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const navigate = useNavigate()

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };

  const onItemClick = () => {
    props.closeModal()
    navigate(props.link)
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div
        className={cn('title')}
        onClick={() => onItemClick()}
      >
        <span>{props.item.title}</span>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {langData.itemBasket.quantity[props.lang]}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{langData.buttons.del[props.lang]}</button>
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
  }).isRequired,
  amount: PropTypes.number,
  lang: PropTypes.string,
  link: PropTypes.string,
  closeModal: PropTypes.func,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  closeModal: () => {}
}

export default memo(ItemBasket);
