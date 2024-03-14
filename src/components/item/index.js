import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import {useNavigate} from "react-router-dom";
import {lang as langData} from '../../lang/data'

function Item(props) {

  const cn = bem('Item');

  const navigate = useNavigate()

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  const onItemClick = () => {
    navigate(props.link)
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <span onClick={() => onItemClick()}>{props.item.title}</span>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{langData.buttons.add[props.lang]}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  lang: PropTypes.string,
  link: PropTypes.string,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
