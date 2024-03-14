import {memo, useState, useEffect} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useLanguage } from "../../language";

function Item(props) {

  const { currentLanguage} = useLanguage();

  const [showItemDetails, setShowItemDetails] = useState(false)

  const location = useLocation()

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  useEffect(() => {
    if (location.state === props.item._id) {
      setShowItemDetails(true)
    }
  })

  return (
    <>
      {showItemDetails 
      ? <div className={cn('container')}>
          <div className={cn('description')}>{props.item.description}</div>
          <div className={cn('manufacturer')}>{currentLanguage === 'ru' ? 'Страна производитель' : 'Manufacturer'}: <span className={cn('value')}>{props.item.madeIn.title} ({props.item.madeIn.code})</span></div>
          <div className={cn('category')}>{currentLanguage === 'ru' ? 'Категория' : 'Category'}:  <span className={cn('value')}>{props.item.category.title}</span></div>
          <div className={cn('edition')}>{currentLanguage === 'ru' ? 'Год выпуска' : 'Edition'}:  <span className={cn('value')}>{props.item.edition}</span></div>
          <div className={cn('pricing')}>{currentLanguage === 'ru' ? 'Цена' : 'Price'}: {numberFormat(props.item.price)} {currentLanguage === 'ru' ? '₽' : 'RUB'}</div>
          <button onClick={callbacks.onAdd}>{currentLanguage === 'ru' ? 'Добавить' : 'Add'}</button>
        </div>
      : <div className={cn()}>
          <div className={cn('title')}>
            <Link to={`/item/${props.item._id}`} state={props.item._id}>
              {props.item.title}
            </Link>
          </div>

          <div className={cn('actions')}>
            <div className={cn('price')}>{numberFormat(props.item.price)} {currentLanguage === 'ru' ? '₽' : 'RUB'}</div>
            <button onClick={callbacks.onAdd}>{currentLanguage === 'ru' ? 'Добавить' : 'Add'}</button>
          </div>
        </div>
    }
  </>
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
