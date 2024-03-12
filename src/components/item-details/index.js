import {memo} from "react";
import PropTypes from "prop-types";
import {numberFormat} from "../../utils";
import {cn as bem} from '@bem-react/classname';
import "./style.css";

function ItemDetails(props) {
  const cn = bem('ItemDetails');

  const callbacks = {
    onAdd: () => props.addToBasket(props.result)
  }

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.result?.description || ''}</div>
      <div>{props.langData.details.country_txt} <span className={cn('bold')}>{props.result.madeIn?.title || ''} ({props.result.madeIn?.code || ''})</span></div>
      <div>{props.langData.details.category_txt} <span className={cn('bold')}>{props.result.category?.title || ''}</span></div>
      <div>{props.langData.details.year_txt} <span className={cn('bold')}>{props.result.edition || 0}</span></div>
      <div className={cn('price')}>{props.langData.details.price_txt} {numberFormat(props.result.price || 0)} ₽</div>

      <button className={cn('btn')} onClick={callbacks.onAdd}>
        {props.langData.buttons.onAddTxt}
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
  langData: PropTypes.object,
  onAdd: PropTypes.func,
};

ItemDetails.defaultProps = {
  onAdd: () => {},
}

export default memo(ItemDetails);
