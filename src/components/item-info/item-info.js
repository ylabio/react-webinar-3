import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import {numberFormat} from "../../utils";
import './style.css';

function ItemInfo({details, addToBasket, buttonTitle}) {
  const cn = bem('ItemInfo');
  return (
    <div className={cn()}>
      <div className={cn('description')}>{Object.keys(details).length ? details.description : ''}</div>
      <div className={cn('country')}>Страна производитель: <b>{Object.keys(details).length ? `${details.madeIn.title} (${details.madeIn.code})` : ''}</b></div>
      <div className={cn('category')}>Категория: <b>{Object.keys(details).length ? details.category.title : ''}</b></div>
      <div className={cn('edition')}>Год выпуска: <b>{details.edition}</b></div>
      <div className={cn('price')}><b>Цена: {numberFormat(details.price || 0)} ₽</b></div>
      <div className={cn('cell')}>
        <button onClick={() => addToBasket(details._id)}>{buttonTitle}</button>
      </div>
   </div>
  )
}

ItemInfo.propTypes = {
  details: PropTypes.object,
  addToBasket: PropTypes.func,
  buttonTitle: PropTypes.string
};

ItemInfo.defaultProps = {
  details: {},
  addToBasket: () => {},
  buttonTitle: '',
}


export default ItemInfo;