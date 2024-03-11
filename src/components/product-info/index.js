import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import {memo} from 'react';
import PropTypes from "prop-types";
import './style.css';

function ProductInfo({ product, onAction }) {

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
        Страна производитель: <BoldText content={country + ` (${countryCode})`}/>
      </p>
      <p className={cn('text')}>
        Категория: <BoldText content={category}/>
      </p>
      <p className={cn('text')}>
        Год выпуска: <BoldText content={year}/>
      </p>
      <p
        className={`${cn('text')} ${cn('text_bold')} ${cn('text_big')}`}
      >
        Цена: {numberFormat(price, 'ru-RU', {style: 'currency', currency: 'RUB'})}
      </p>
      <button className={cn('button')} onClick={callbacks.onAdd()}>Добавить</button>
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