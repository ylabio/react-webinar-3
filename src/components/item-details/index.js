import React, {useContext} from "react";
import {LanguagesContext} from "../../lang/context";
import PropTypes from "prop-types";
import useSelector from "../../store/use-selector";
import {numberFormat} from "../../utils";
import {cn as bem} from '@bem-react/classname';
import "./style.css";

function ItemDetails(props) {
  const cn = bem('ItemDetails');
  const {data} = useContext(LanguagesContext);

  const callbacks = {
    onAdd: () => props.addToBasket(props.result._id)
  }

  // При обновлении страницы теряются данные списка товаров, это для проверки
  const select = useSelector(state => ({ list: state.catalog.list }))

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.result?.description || ''}</div>
      <div>{data.details.country_txt} <span className={cn('bold')}>{props.result.madeIn?.title || ''} ({props.result.madeIn?.code || ''})</span></div>
      <div>{data.details.category_txt} <span className={cn('bold')}>{props.result.category?.title || ''}</span></div>
      <div>{data.details.year_txt} <span className={cn('bold')}>{props.result.edition || 0}</span></div>
      <div className={cn('price')}>{data.details.price_txt} {numberFormat(props.result.price || 0)} ₽</div>

      <button className={cn('btn')} onClick={select.list.length ? callbacks.onAdd : () => console.log('Чтоб приложение не лягло, временно ограничик клик. Когда/если будет апи для добавляения в корзину по коду, тогда и здесь изменю функционал')}>
        {data.buttons.onAddTxt}
      </button>
    </div>
  )
}

ItemDetails.propTypes = {
  _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
  country: PropTypes.string,
  countryCode: PropTypes.string,
  category: PropTypes.string,
  year: PropTypes.number,
  price: PropTypes.number,
  onAdd: PropTypes.func,
};

ItemDetails.defaultProps = {
  onAdd: () => {},
}

export default React.memo(ItemDetails);
