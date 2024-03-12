import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { Link } from 'react-router-dom';
import useSelector from '../../store/use-selector';
import { UI_TEXTS } from '../../consts/content';

function Item(props) {

  const cn = bem('Item');

  const select = useSelector(state => ({
    language: state.language.currentLanguage
  }))

  const uiText = {
    addItemBtn: UI_TEXTS[select.language].main.catalogList.addItemBtn,
  }

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <Link to={`product/${props.item._id}`} className={cn('title')}>
        {props.item.title}
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{uiText.addItemBtn}</button>
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
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
