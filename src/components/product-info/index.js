import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import {memo} from 'react';
import PropTypes from "prop-types";
import {useTranslate} from '../../hooks/useTranslate'
import './style.css';

function ProductInfo({ product, onAction }) {

  const tr = useTranslate()

  const
  {
    _id,
    description,
    price,
    country,
    countryCode,
    category,
    year
  } = product

  const cn = bem('ProductInfo');

  const callbacks = {
    onAdd: () => onAction(_id)
  }

  const BoldText = ({content}) => (
    <span className={cn('text_bold')}>{content}</span>
  )

  return (
    <div className={cn()}>
      <p className={cn('text')}>{description}</p>
      <p className={cn('text')}>
        {tr('ManufacturerСountry')}: <BoldText content={country + ` (${countryCode})`}/>
      </p>
      <p className={cn('text')}>
        {tr('Category')}: <BoldText content={category}/>
      </p>
      <p className={cn('text')}>
        {tr('YearOfManufacture')}: <BoldText content={year}/>
      </p>
      <p
        className={`${cn('text')} ${cn('text_bold')} ${cn('text_big')}`}
      >
        Цена: {numberFormat(price, 'ru-RU', {style: 'currency', currency: 'RUB'})}
      </p>
      <button className={cn('button')} onClick={callbacks.onAdd}>{tr('Add')}</button>
    </div>
  )
}

ProductInfo.PropTypes = {
  product:  PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    price: PropTypes.number,
    country: PropTypes.string,
    countryCode: PropTypes.string,
    category: PropTypes.string,
    year: PropTypes.number,
  }).isRequired,
  onAction: PropTypes.func,
}

ProductInfo.defaultProps = {
  onAction: () => {},
}

export default memo(ProductInfo);